import NPC_SCHEDULES from '../config/atlas/npc-schedules.js';

export default class NpcScheduleManager {
    constructor(scene) {
        this.scene = scene;
        this.registry = new Map();        // slug -> RuntimeStateRecord
        this.scheduleConfigs = {};        // slug -> schedule config from atlas
        this.debug = false;                // enable debug logging

        this._loadScheduleConfigs();      // pull from npc-schedules.js
        this._initRegistry();            // create runtime records for all scheduled NPCs
        this._bindEvents();
        this._primeFromCurrentTime();
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
            return false;
        }

        const schedule = Array.isArray(record.config.schedule) ? record.config.schedule : [];
        if (schedule.length === 0) {
            return false;
        }

        const matchingRules = schedule
            .filter((rule) => this._ruleMatches(rule, now))
            .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

        const rule = matchingRules[0] ?? schedule[0];
        const destination = this._resolveDestination(rule.destination);
        if (!destination) {
            return false;
        }

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

        if (record.slug === 'PATRICE') {
            console.log(`[NPC_SCHEDULE_DEBUG] slug=${record.slug} rule=${record.activePlan.ruleId ?? 'none'} resolvedTile=${destination.x},${destination.y} indoors=${record.activePlan.indoors} roomId=${record.activePlan.roomId ?? 'null'}`);
        }

        if (record.mode === 'SCHEDULED') {
            record.worldX = destination.x;
            record.worldY = destination.y;
            record.facing = record.activePlan.arrivalFacing;
            record.scene = record.activePlan.indoors ? 'interior' : 'exterior';
            record.roomId = record.scene === 'interior' ? (record.activePlan.roomId ?? null) : null;
        }

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
    requestFollow(slug, target = 'PLAYER') {
        const r = this.registry.get(slug);
        if (!r || r.mode === 'TRANSIT_LOCKED_BUS') return false;
        r.suspendedPlan = r.activePlan;
        r.mode = 'FOLLOWING_PLAYER';
        r.followTarget = target;
        return true;
    }

    // Release follow — NPC returns to schedule
    releaseFollow(slug) {
        const r = this.registry.get(slug);
        if (!r) return;
        r.mode = 'SCHEDULED';
        r.followTarget = null;
        r.suspendedPlan = null;
        this._replan(r, this.scene.manager.time.now);  // recompute from current time+pos
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
                activePlanRuleId: record.activePlan?.ruleId ?? null,
                currentLegIndex: record.currentLegIndex ?? 0
            };
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
                this._replan(record, now);
                continue;
            }

            if (typeof saved.worldX === 'number') record.worldX = saved.worldX;
            if (typeof saved.worldY === 'number') record.worldY = saved.worldY;
            if (typeof saved.scene === 'string') record.scene = saved.scene;
            if (typeof saved.roomId === 'string' || typeof saved.roomId === 'number') record.roomId = String(saved.roomId);
            if (typeof saved.facing === 'string') record.facing = saved.facing;
            if (typeof saved.mode === 'string') record.mode = saved.mode;
            if (typeof saved.currentLegIndex === 'number') record.currentLegIndex = saved.currentLegIndex;

            this._replan(record, now);
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
            // Only use portal index for authoritative world coordinate
            const portalFromIndex = this._queryPortalIndexByAddress(destination.dir, destination.number, destination.street);
            if (portalFromIndex && typeof portalFromIndex.x === 'number' && typeof portalFromIndex.y === 'number') {
                return portalFromIndex;
            }
            
            // No portal index entry found for this address
            if (this.debug) {
                console.warn(`[NPC_SCHEDULE] No portal index entry for address: ${destination.dir} ${destination.number} ${destination.street}`);
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