import NPC_SCHEDULES from '../config/atlas/npc-schedules.js';

export default class NpcScheduleManager {
    constructor(scene) {
        this.scene = scene;
        this.registry = new Map();        // slug -> RuntimeStateRecord
        this.scheduleConfigs = {};        // slug -> schedule config from atlas
        this.debug = true;                // enable debug logging

        this._loadScheduleConfigs();      // pull from npc-schedules.js
        this._initRegistry();            // create runtime records for all scheduled NPCs
        this._bindEvents();
        // NOTE: do NOT call _primeFromCurrentTime() here — the portal index is not
        // loaded yet and address lookups will fall back to stale block-local coords.
        // Call primeSchedules() explicitly after bootstrapPortalIndexFromDisk().
    }

    // Call this once the portal index is fully loaded (after bootstrapPortalIndexFromDisk).
    // Skipped automatically when fromSaveData() will be called immediately after.
    primeSchedules(now = this._getNow()) {
        this._primeFromCurrentTime(now);
    }

    _bindEvents() {
        this.scene.events.on('QUARTER_CHANGE', (now) => this.onQuarterChange(now));
    }

    // Called every quarter-hour — re-evaluates all NPC plans
    onQuarterChange(now) {
        for (const [slug, record] of this.registry) {
            if (record.mode !== 'SCHEDULED') continue;
            this._replan(record, now);
        }
    }

    // Pick highest-priority matching rule, build leg plan, update record
    _replan(record, now) {
        if (!record || !record.config) {
            if (this.debug) console.warn(`[NpcSchedule] _replan failed: no record or config`);
            return false;
        }

        const schedule = Array.isArray(record.config.schedule) ? record.config.schedule : [];
        if (schedule.length === 0) {
            if (this.debug) console.warn(`[NpcSchedule] _replan failed: empty schedule`);
            return false;
        }

        const matchingRules = schedule
            .filter((rule) => this._ruleMatches(rule, now))
            .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

        const rule = matchingRules[0] ?? schedule[0];
        const destination = this._resolveDestination(rule.destination);
        if (!destination) {
            if (this.debug) console.warn(`[NpcSchedule] _replan failed for ${record.slug}: could not resolve destination for rule ${rule.id}`, rule.destination);
            return false;
        }

        const nextScene = !!rule.indoors ? 'interior' : 'exterior';
        const nextRoomId = nextScene === 'interior' ? (rule.roomId ?? null) : null;

        // Check if this plan is actually different from the current one
        const planChanged = !record.activePlan || 
                           record.activePlan.ruleId !== (rule.id ?? null) ||
                           record.activePlan.destination.x !== destination.x ||
                           record.activePlan.destination.y !== destination.y ||
                           record.scene !== nextScene ||
                           String(record.roomId ?? '') !== String(nextRoomId ?? '');

        record.activePlan = {
            ruleId: rule.id ?? null,
            destination,
            indoors: !!rule.indoors,
            roomId: rule.roomId ?? null,
            arrivalAction: rule.arrivalAction ?? 'IDLE',
            arrivalFacing: rule.arrivalFacing ?? 's',
            legs: [{ type: 'STATIC', x: destination.x, y: destination.y }]
        };
        record.currentLegIndex = 0;


        if (record.mode === 'SCHEDULED') {
            record.facing = record.activePlan.arrivalFacing;

            // Check if scene changed before updating
            const sceneChanged = record.scene !== nextScene || String(record.roomId ?? '') !== String(nextRoomId ?? '');

            record.scene = nextScene;
            record.roomId = nextRoomId;

            // Always set world position if null (first spawn in scene) or if scene changed.
            // For same-scene plan changes with existing position, keep current position for routing.
            if (record.worldX === null || record.worldY === null || sceneChanged) {
                record.worldX = destination.x;
                record.worldY = destination.y;
            }

            if (planChanged) {
                record.planVersion++;  // trigger movement dispatch in projector
            }
        }

        if (this.debug) console.log(`[NpcSchedule] _replan succeeded for ${record.slug}: destination=(${destination.x},${destination.y}), scene=${nextScene}, pos=(${record.worldX},${record.worldY})`);
        return true;
    }

    // Evaluate all conditions for a rule
    _ruleMatches(rule, now) {
        if (!rule) {
            return false;
        }

        if (!this._timeMatches(now, rule.timeStart, rule.timeEnd)) {
            return false;
        }

        const conditions = Array.isArray(rule.conditions) ? rule.conditions : [];
        for (let i = 0; i < conditions.length; i++) {
            if (!this._conditionMatches(conditions[i])) {
                return false;
            }
        }

        return true;
    }

    // Request follow — returns false if transit-locked
    requestFollow(slug, target = 'PLAYER', followDistance = 1) {
        const r = this.registry.get(slug);
        if (!r || r.mode === 'TRANSIT_LOCKED_BUS') return false;
        r.suspendedPlan = r.activePlan;
        r.mode = 'FOLLOWING_PLAYER';
        r.followTarget = target;
        r.followDistance = followDistance;
        return true;
    }

    // Release follow — NPC returns to schedule
    releaseFollow(slug) {
        const r = this.registry.get(slug);
        if (!r) return;
        r.mode = 'SCHEDULED';
        r.followTarget = null;
        r.followDistance = 1;
        r.suspendedPlan = null;
        r._lastDispatchedPlanVersion = -1;  // reset so next replan triggers movement dispatch
        this._replan(r, this.scene.manager.time.now);  // recompute from current time+pos
    }

    releaseAllFollowers() {
        for (const [slug, record] of this.registry) {
            if (record?.mode === 'FOLLOWING_PLAYER') {
                this.releaseFollow(slug);
            }
        }
    }

    // NPC boarded a bus — lock redirects
    notifyBusBoarded(slug, busId) {
        const record = this.registry.get(slug);
        if (!record) {
            return false;
        }

        record.mode = 'TRANSIT_LOCKED_BUS';
        record.transitBusId = busId ?? null;
        return true;
    }

    // NPC left bus — unlock and replan
    notifyBusAlighted(slug) {
        const record = this.registry.get(slug);
        if (!record) {
            return false;
        }

        record.mode = 'SCHEDULED';
        record.transitBusId = null;
        this._replan(record, this._getNow());
        return true;
    }

    // Called by NpcManager/RuntimeProjector when a leg completes
    notifyLegComplete(slug) {
        const record = this.registry.get(slug);
        if (!record || !record.activePlan || !Array.isArray(record.activePlan.legs)) {
            return false;
        }

        record.currentLegIndex = Math.min(record.currentLegIndex + 1, Math.max(record.activePlan.legs.length - 1, 0));
        return true;
    }

    // Save/restore registry to save slot
    toSaveData() {
        const out = {};

        for (const [slug, record] of this.registry) {
            out[slug] = {
                worldX: record.worldX,
                worldY: record.worldY,
                scene: record.scene ?? null,
                roomId: record.roomId ?? null,
                facing: record.facing ?? 's',
                mode: record.mode ?? 'SCHEDULED',
                followTarget: record.followTarget ?? null,
                followDistance: record.followDistance ?? 1,
                activePlanRuleId: record.activePlan?.ruleId ?? null,
                currentLegIndex: record.currentLegIndex ?? 0
            };
            if (this.debug) console.log(`[NpcSchedule] toSaveData ${slug}:`, out[slug]);
        }

        return out;
    }

    fromSaveData(data, now = this._getNow()) {
        if (!data || typeof data !== 'object') {
            this._primeFromCurrentTime(now);
            return;
        }

        for (const [slug, record] of this.registry) {
            const saved = data[slug];
            if (!saved) {
                // No saved data — reset position to null so _replan computes the correct location for this time
                record.worldX = null;
                record.worldY = null;
                if (this.debug) console.log(`[NpcSchedule] fromSaveData ${slug}: no saved data, replanning from scratch`);
                this._replan(record, now);
                continue;
            }

            if (typeof saved.scene === 'string') record.scene = saved.scene;
            if (typeof saved.roomId === 'string' || typeof saved.roomId === 'number') record.roomId = String(saved.roomId);
            if (typeof saved.facing === 'string') record.facing = saved.facing;
            if (typeof saved.currentLegIndex === 'number') record.currentLegIndex = saved.currentLegIndex;

            if (this.debug) console.log(`[NpcSchedule] fromSaveData ${slug}: restored`, { worldX: saved.worldX, worldY: saved.worldY, scene: record.scene, mode: saved.mode });

            // Always replan to update active plan for current time (unless FOLLOWING_PLAYER).
            // Clear world position first so _replan snaps to the correct schedule destination
            // (the portal index is now loaded; any coords set during constructor _primeFromCurrentTime
            // may have used a stale fallback address lookup).
            // If replan fails, fall back to the saved position so the NPC isn't left coordinate-less.
            if (saved.mode !== 'FOLLOWING_PLAYER') {
                record.worldX = null;
                record.worldY = null;
                const replanOk = this._replan(record, now);
                if (!replanOk) {
                    if (typeof saved.worldX === 'number') record.worldX = saved.worldX;
                    if (typeof saved.worldY === 'number') record.worldY = saved.worldY;
                }
                if (this.debug) console.log(`[NpcSchedule] fromSaveData ${slug}: replan result=${replanOk}, now at (${record.worldX}, ${record.worldY})`);
                continue;
            }

            // FOLLOWING_PLAYER: restore mode and suspend the current plan
            record.mode = 'FOLLOWING_PLAYER';
            record.followTarget = typeof saved.followTarget === 'string' ? saved.followTarget : 'PLAYER';
            record.followDistance = typeof saved.followDistance === 'number' ? saved.followDistance : 1;
            record.suspendedPlan = record.activePlan;
            if (this.debug) console.log(`[NpcSchedule] fromSaveData ${slug}: restored FOLLOWING_PLAYER mode`);
        }
    }

    getRecord(slug) { return this.registry.get(slug); }

    ensurePlanned(recordOrSlug, now = this._getNow()) {
        const record = typeof recordOrSlug === 'string' ? this.registry.get(recordOrSlug) : recordOrSlug;
        if (!record) {
            return false;
        }

        const hasWorld = typeof record.worldX === 'number' && typeof record.worldY === 'number';
        if (record.activePlan && hasWorld) {
            return true;
        }

        return this._replan(record, now);
    }

    _loadScheduleConfigs() {
        // Load schedule configs from atlas/npc-schedules.js
        // (this is pure data, no runtime state)
        this.scheduleConfigs = NPC_SCHEDULES;
    }

    _initRegistry() {
        for (const slug in this.scheduleConfigs) {
            const config = this.scheduleConfigs[slug];
            const record = {
                slug: slug,
                config: config,
                mode: 'SCHEDULED',          // SCHEDULED | FOLLOWING_PLAYER | TRANSIT_LOCKED_BUS | SCRIPTED_OVERRIDE
                followTarget: null,         // if FOLLOWING_PLAYER, who to follow
                followDistance: 1,
                suspendedPlan: null,        // if FOLLOWING_PLAYER, the plan that was suspended
                activePlan: null,           // the current plan (rule + legs)
                currentLegIndex: 0,         // index into activePlan.legs
                worldX: null,               // current world position (for save/restore)
                worldY: null,
                scene: 'exterior',
                roomId: null,
                facing: 's',
                spawnedScene: null,         // which scene the NPC is currently spawned in (if any)
                spawnedChunk: null,         // which chunk the NPC is currently spawned in (if any)
                runtimeNpc: null,
                planVersion: 0,             // incremented when plan changes; used to trigger movement one-shot
                _lastDispatchedPlanVersion: -1,  // tracks which planVersion was already dispatched
            };
            this.registry.set(slug, record);
        }
    }

    _primeFromCurrentTime(now = this._getNow()) {
        for (const [slug, record] of this.registry) {
            this._replan(record, now);
        }
    }

    _getNow() {
        const fromManager = this.scene?.manager?.time?.now;
        if (fromManager && typeof fromManager.hour === 'number' && typeof fromManager.minute === 'number') {
            return fromManager;
        }

        const fromSlot = this.scene?.slot?.TIME;
        if (fromSlot && typeof fromSlot.HOUR === 'number' && typeof fromSlot.MINUTE === 'number') {
            return {
                hour: fromSlot.HOUR,
                minute: fromSlot.MINUTE,
                second: fromSlot.SECOND ?? 0,
                day: fromSlot.DAY ?? 0
            };
        }

        return { hour: 0, minute: 0, second: 0, day: 0 };
    }

    _timeMatches(now, timeStart, timeEnd) {
        if (!timeStart || !timeEnd) {
            return true;
        }

        const currentMinute = ((now?.hour ?? 0) * 60) + (now?.minute ?? 0);
        const startMinute = ((timeStart.hour ?? 0) * 60) + (timeStart.minute ?? 0);
        const endMinute = ((timeEnd.hour ?? 23) * 60) + (timeEnd.minute ?? 59);

        if (startMinute <= endMinute) {
            return currentMinute >= startMinute && currentMinute <= endMinute;
        }

        return currentMinute >= startMinute || currentMinute <= endMinute;
    }

    _conditionMatches(condition = {}) {
        if (!condition || typeof condition !== 'object' || !condition.type) {
            return true;
        }

        if (condition.type === 'QUEST_FLAG') {
            const quest = this.scene?.slot?.QUEST;
            if (!quest || condition.flag == null) {
                return false;
            }

            return quest[condition.flag] === condition.value;
        }

        if (condition.type === 'WEATHER') {
            const expected = Array.isArray(condition.weather) ? condition.weather : [];
            if (expected.length === 0) {
                return true;
            }

            const current = this.scene?.manager?.weather?.current ?? this.scene?.manager?.weather;
            if (typeof current !== 'string') {
                return false;
            }

            return expected.includes(current);
        }

        return true;
    }

    _resolveDestination(destination = {}) {
        if (!destination || typeof destination !== 'object') {
            return null;
        }

        if (destination.type === 'TILE') {
            if (typeof destination.x === 'number' && typeof destination.y === 'number') {
                return { x: Math.floor(destination.x), y: Math.floor(destination.y) };
            }
            return null;
        }

        if (destination.type === 'SLUG') {
            const tiles = this.scene?.exterior?.getTilesFromSlug?.(destination.slug);
            if (tiles && typeof tiles.x === 'number' && typeof tiles.y === 'number') {
                return { x: tiles.x, y: tiles.y };
            }
            return null;
        }

        if (destination.type === 'ADDRESS') {
            // Only use portal index for authoritative world coordinate.
            // Add y+1 to step off the portal wall's collision tile and onto the
            // walkable tile in front of the door.
            const portalFromIndex = this._queryPortalIndexByAddress(destination.dir, destination.number, destination.street);
            if (portalFromIndex && typeof portalFromIndex.x === 'number' && typeof portalFromIndex.y === 'number') {
                return { x: portalFromIndex.x, y: portalFromIndex.y + 1 };
            }

            // No portal index entry — ADDRESS destinations require portal index authority
            if (this.debug) {
                console.warn(`[NPC_SCHEDULE] ADDRESS destination has no portal index entry: ${destination.dir} ${destination.number} ${destination.street}`);
            }
            return null;
        }

        if (destination.type === 'INTERIOR') {
            if (typeof destination.x === 'number' && typeof destination.y === 'number') {
                return { x: Math.floor(destination.x), y: Math.floor(destination.y) };
            }
            return null;
        }

        return null;
    }

    _queryPortalIndexByAddress(dir, number, street) {
        const portalIndex = this.scene?.exterior?.portalIndex;
        if (!Array.isArray(portalIndex) || portalIndex.length === 0) {
            if (this.debug) {
                console.warn(`[NPC_SCHEDULE] Portal index empty or missing for query: ${dir} ${number} ${street}`);
            }
            return null;
        }

        for (const entry of portalIndex) {
            if (!entry || !entry.address) {
                continue;
            }

            const addr = entry.address;
            if (String(addr.dir).toUpperCase() === String(dir).toUpperCase() &&
                String(addr.number) === String(number) &&
                String(addr.street).toLowerCase() === String(street).toLowerCase()) {
                if (typeof entry.world?.x === 'number' && typeof entry.world?.y === 'number') {
                    if (this.debug) {
                        console.log(`[NPC_SCHEDULE] Found portal index entry: ${dir} ${number} ${street} → (${entry.world.x}, ${entry.world.y})`);
                    }
                    return { x: entry.world.x, y: entry.world.y };
                }
            }
        }

        if (this.debug) {
            console.warn(`[NPC_SCHEDULE] No portal index entry found for: ${dir} ${number} ${street}`);
            console.log(`[NPC_SCHEDULE] Available addresses in portal index:`, portalIndex.map(e => e.address).filter(Boolean));
        }
        return null;
    }
}