import NPC_SCHEDULES from '../config/atlas/npc-schedules.js';
import ROOMS from '../config/atlas/rooms.js';
import WorldDataLoader from '../world/world-data-loader.js';

export default class NpcScheduleManager {
    constructor(scene) {
        this.scene = scene;
        this.registry = new Map();        // slug -> RuntimeStateRecord
        this.scheduleConfigs = {};        // slug -> schedule config from atlas
        this.debug = true;                // enable debug logging
        this.portalIndexCache = null;     // fallback for interior scenes without ExteriorManager
        this.portalIndexLoader = null;
        this.traceEnabled = true;         // temporary transition diagnostics
        this.traceNpcSlug = 'AUNTIE';
        this.traceConsoleEnabled = false; // keep console quiet; inspect window.__npcTrace for details
        this.traceMaxEntries = 80;
        this.traceDedupeWindowMs = 1200;
        this._lastTraceFingerprint = null;
        this._lastTraceAt = 0;

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

    async hydratePortalIndexFromDisk() {
        if (Array.isArray(this.scene?.exterior?.portalIndex) && this.scene.exterior.portalIndex.length > 0) {
            this.portalIndexCache = this.scene.exterior.portalIndex;
            return true;
        }

        const slotRaw = this.scene?.slot?.SAVE?.SLOT;
        const slot = Number.isInteger(slotRaw) ? slotRaw : parseInt(slotRaw, 10);
        if (!Number.isInteger(slot) || slot < 0) {
            return false;
        }

        if (this.portalIndexLoader == null) {
            this.portalIndexLoader = new WorldDataLoader('/assets/chunks/', { slot });
        }

        try {
            const loaded = await this.portalIndexLoader.loadPortalIndex();
            const portals = Array.isArray(loaded?.portals) ? loaded.portals : [];
            this.portalIndexCache = portals;
            return portals.length > 0;
        } catch (_e) {
            this.portalIndexCache = [];
            return false;
        }
    }

    _bindEvents() {
        this.scene.events.on('QUARTER_CHANGE', (now) => this.onQuarterChange(now));
    }

    _traceRecord(context, record, extra = null) {
        if (!this.traceEnabled || !record || record.slug !== this.traceNpcSlug) {
            return;
        }

        const isTransitionContext = context.startsWith('scene:') ||
            context === 'advancePortalLeg:before' ||
            context === 'advancePortalLeg:after' ||
            context === 'advanceOffscreenTowardScene:end' ||
            context === 'fromSaveData:restored' ||
            context === 'fromSaveData:afterReplan';

        // Keep trace focused on scene-handoff checkpoints.
        if (!isTransitionContext) {
            return;
        }

        if (context === 'advanceOffscreenTowardScene:end' && extra?.changed !== true) {
            return;
        }

        if (context === 'advanceOffscreenTowardScene:end' && extra?.sceneOrRoomChanged !== true) {
            return;
        }

        const legCount = Array.isArray(record.activePlan?.legs) ? record.activePlan.legs.length : 0;
        const idx = Math.max(0, Math.min(record.currentLegIndex ?? 0, Math.max(legCount - 1, 0)));
        const leg = legCount > 0 ? record.activePlan.legs[idx] : null;
        const payload = {
            scene: record.scene,
            roomId: record.roomId,
            worldX: record.worldX,
            worldY: record.worldY,
            legIndex: record.currentLegIndex,
            legCount,
            legType: leg?.type ?? null,
            legScene: leg?.scene ?? null,
            legRoomId: leg?.roomId ?? null,
            legX: leg?.x ?? null,
            legY: leg?.y ?? null,
            legToScene: leg?.toScene ?? null,
            legToRoomId: leg?.toRoomId ?? null,
            planRuleId: record.activePlan?.ruleId ?? null,
            planVersion: record.planVersion,
        };

        if (extra && typeof extra === 'object') {
            Object.assign(payload, extra);
        }

        const fingerprint = JSON.stringify({
            context,
            scene: payload.scene,
            roomId: payload.roomId,
            worldX: payload.worldX,
            worldY: payload.worldY,
            legIndex: payload.legIndex,
            legType: payload.legType,
            legScene: payload.legScene,
            legRoomId: payload.legRoomId,
            legToScene: payload.legToScene,
            legToRoomId: payload.legToRoomId,
            targetScene: payload.targetScene ?? null,
            targetRoomId: payload.targetRoomId ?? null,
            changed: payload.changed ?? null,
            portalToScene: payload.portalToScene ?? null,
            portalToRoomId: payload.portalToRoomId ?? null,
            replanOk: payload.replanOk ?? null,
        });

        const now = Date.now();
        if (this._lastTraceFingerprint === fingerprint && (now - this._lastTraceAt) < this.traceDedupeWindowMs) {
            return;
        }
        this._lastTraceFingerprint = fingerprint;
        this._lastTraceAt = now;

        payload.context = context;
        payload.at = now;

        if (typeof window !== 'undefined') {
            if (!Array.isArray(window.__npcTrace)) {
                window.__npcTrace = [];
            }
            window.__npcTrace.push(payload);
            if (window.__npcTrace.length > this.traceMaxEntries) {
                window.__npcTrace.shift();
            }
        }

        if (this.traceConsoleEnabled) {
            console.log(`[NPC_TRACE] ${context}`, payload);
        }
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

        // When running inside an interior scene, only rules that expect to be
        // indoors are eligible. Exterior rules can't resolve ADDRESS destinations
        // (no portal index) and should not be selected.
        // In an exterior scene all rules are eligible — the scheduler must be
        // able to see indoors:true rules so it knows to route the NPC inside.
        const currentPlace = this.scene?.place ?? 'exterior';
        const sceneFilter = (rule) => currentPlace === 'interior' ? !!rule.indoors : true;

        const matchingRules = schedule
            .filter((rule) => sceneFilter(rule) && this._ruleMatches(rule, now))
            .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

        // If no rules match the current scene context, bail — don't fall back to
        // an out-of-context rule (e.g. don't use an exterior rule while indoors).
        if (matchingRules.length === 0) {
            return false;
        }

        const rule = matchingRules[0];
        const destination = this._resolveDestination(rule.destination);
        if (!destination) {
            if (this.debug) console.warn(`[NpcSchedule] _replan failed for ${record.slug}: could not resolve destination for rule ${rule.id}`, rule.destination);
            return false;
        }

        const arrivalZone = this._resolveArrivalZone(rule.arrivalZone, destination);

        const targetScene = !!rule.indoors ? 'interior' : 'exterior';
        const targetRoomId = targetScene === 'interior'
            ? (rule.destination?.room_id ?? rule.roomId ?? null)
            : null;

        let legs = this._buildPortalAwareLegs(record, destination, targetScene, targetRoomId);
        if (!Array.isArray(legs) || legs.length === 0) {
            const originUnknown = !(typeof record?.worldX === 'number' && typeof record?.worldY === 'number');
            if (originUnknown) {
                legs = this._buildBootstrapLegsForUnknownOrigin(destination, targetScene, targetRoomId);
            }

            if (!Array.isArray(legs) || legs.length === 0) {
                if (this.debug) {
                    console.warn(`[NpcSchedule] _replan failed for ${record.slug}: no portal route from ${record.scene}:${record.roomId} to ${targetScene}:${targetRoomId}`);
                }
                return false;
            }
        }

        // Check if this plan is actually different from the current one
        const planChanged = !record.activePlan || 
                   record.activePlan.ruleId !== (rule.id ?? null) ||
                   record.activePlan.destination.x !== destination.x ||
                   record.activePlan.destination.y !== destination.y ||
                   !this._arrivalZonesEqual(record.activePlan.arrivalZone, arrivalZone) ||
                   record.activePlan.targetScene !== targetScene ||
                   String(record.activePlan.targetRoomId ?? '') !== String(targetRoomId ?? '') ||
                   !this._legsEqual(record.activePlan.legs, legs);

        const previousLegIndex = Number.isInteger(record.currentLegIndex) ? record.currentLegIndex : 0;

        record.activePlan = {
            ruleId: rule.id ?? null,
            destination,
            arrivalZone,
            indoors: !!rule.indoors,
            targetScene,
            targetRoomId,
            arrivalAction: rule.arrivalAction ?? 'IDLE',
            arrivalFacing: rule.arrivalFacing ?? 's',
            legs,
        };

        const maxLegIndex = Math.max(0, legs.length - 1);
        record.currentLegIndex = planChanged
            ? 0
            : Math.min(previousLegIndex, maxLegIndex);

        if (planChanged) {
            record._lastDispatchedLegKey = null;
        }


        if (record.mode === 'SCHEDULED') {
            record.facing = record.activePlan.arrivalFacing;

            const firstLeg = legs[0] ?? null;
            if ((record.worldX === null || record.worldY === null) && firstLeg && typeof firstLeg.x === 'number' && typeof firstLeg.y === 'number') {
                record.scene = firstLeg.scene ?? record.scene;
                record.roomId = firstLeg.scene === 'interior'
                    ? (firstLeg.roomId != null ? String(firstLeg.roomId) : null)
                    : null;
                record.worldX = firstLeg.x;
                record.worldY = firstLeg.y;
            }

            if (planChanged) {
                record.planVersion++;  // trigger movement dispatch in projector
            }
        }

        if (this.debug) console.log(`[NpcSchedule] _replan succeeded for ${record.slug}: destination=(${destination.x},${destination.y}), target=${targetScene}:${targetRoomId}, pos=(${record.worldX},${record.worldY})`);
        this._traceRecord('_replan:done', record, {
            targetScene,
            targetRoomId,
            planChanged,
        });
        return true;
    }

    _legsEqual(left, right) {
        const l = Array.isArray(left) ? left : [];
        const r = Array.isArray(right) ? right : [];
        if (l.length !== r.length) {
            return false;
        }

        for (let i = 0; i < l.length; i++) {
            const a = l[i] ?? {};
            const b = r[i] ?? {};
            if (a.type !== b.type ||
                a.scene !== b.scene ||
                String(a.roomId ?? '') !== String(b.roomId ?? '') ||
                a.x !== b.x ||
                a.y !== b.y ||
                a.toScene !== b.toScene ||
                String(a.toRoomId ?? '') !== String(b.toRoomId ?? '') ||
                String(a.portalRoomId ?? '') !== String(b.portalRoomId ?? '') ||
                a.toX !== b.toX ||
                a.toY !== b.toY) {
                return false;
            }
        }

        return true;
    }

    _buildBootstrapLegsForUnknownOrigin(destination, targetScene, targetRoomId) {
        if (targetScene !== 'interior') {
            return [{
                type: 'STATIC',
                scene: targetScene,
                roomId: null,
                x: destination.x,
                y: destination.y,
            }];
        }

        const entry = this._resolveInteriorBootstrapPortal(targetRoomId, destination);
        if (!entry) {
            return [{
                type: 'STATIC',
                scene: 'interior',
                roomId: targetRoomId != null ? String(targetRoomId) : null,
                x: destination.x,
                y: destination.y,
            }];
        }

        const legs = [{
            type: 'PORTAL',
            scene: 'interior',
            roomId: targetRoomId != null ? String(targetRoomId) : null,
            x: entry.x,
            y: entry.y,
            toScene: 'interior',
            toRoomId: targetRoomId != null ? String(targetRoomId) : null,
            toX: entry.x,
            toY: entry.y,
            portalId: null,
            portalRoomId: entry.portalRoomId,
        }];

        if (entry.x !== destination.x || entry.y !== destination.y) {
            legs.push({
                type: 'STATIC',
                scene: 'interior',
                roomId: targetRoomId != null ? String(targetRoomId) : null,
                x: destination.x,
                y: destination.y,
            });
        }

        return legs;
    }

    _resolveInteriorBootstrapPortal(roomId, destination) {
        if (roomId == null) {
            return null;
        }

        const room = ROOMS?.[`room_${roomId}`];
        const features = room?.roomData?.featureList;
        if (!Array.isArray(features) || features.length === 0) {
            return null;
        }

        const wallHeight = Number(room?.wallHeight ?? 3);
        const offsetX = 1;
        const offsetY = wallHeight + 1;
        const candidates = [];

        features.forEach((feature) => {
            const portal = feature?.params?.portal;
            if (!portal || portal.room_id == null) {
                return;
            }

            const x = offsetX + Math.floor(Number(feature?.x ?? 0));
            const y = offsetY + Math.floor(Number(feature?.y ?? 0));
            if (!Number.isFinite(x) || !Number.isFinite(y)) {
                return;
            }

            const target = String(portal.room_id);
            const dist = Math.abs(destination.x - x) + Math.abs(destination.y - y);
            candidates.push({
                x,
                y,
                portalRoomId: target,
                fromExterior: target === '-1',
                dist,
            });
        });

        if (candidates.length === 0) {
            return null;
        }

        candidates.sort((a, b) => {
            if (a.fromExterior !== b.fromExterior) {
                return a.fromExterior ? -1 : 1;
            }
            if (a.dist !== b.dist) {
                return a.dist - b.dist;
            }
            if (a.y !== b.y) {
                return a.y - b.y;
            }
            return a.x - b.x;
        });

        return candidates[0];
    }

    _buildPortalAwareLegs(record, destination, targetScene, targetRoomId) {
        const originUnknown = !(typeof record?.worldX === 'number' && typeof record?.worldY === 'number');
        const activeScene = this.scene?.place ?? 'exterior';
        const activeRoomId = this.scene?.room_id ?? null;

        if (originUnknown && targetScene === 'interior' && activeScene === 'interior' &&
            String(targetRoomId ?? '') === String(activeRoomId ?? '')) {
            return this._buildBootstrapLegsForUnknownOrigin(destination, targetScene, targetRoomId);
        }

        const currentScene = record?.scene ?? 'exterior';
        const currentRoomId = currentScene === 'interior'
            ? (record?.roomId != null ? String(record.roomId) : null)
            : null;

        const startNode = currentScene === 'interior' ? currentRoomId : '-1';
        const goalNode = targetScene === 'interior'
            ? (targetRoomId != null ? String(targetRoomId) : null)
            : '-1';

        if (startNode == null || goalNode == null) {
            return null;
        }

        if (startNode === goalNode) {
            const originUnknown = !(typeof record?.worldX === 'number' && typeof record?.worldY === 'number');
            if (originUnknown && targetScene === 'interior') {
                return this._buildBootstrapLegsForUnknownOrigin(destination, targetScene, targetRoomId);
            }

            return [{
                type: 'STATIC',
                scene: targetScene,
                roomId: targetScene === 'interior' ? String(targetRoomId) : null,
                x: destination.x,
                y: destination.y,
            }];
        }

        const graph = this._buildPortalGraph();
        const route = this._findShortestPortalRoute(graph, {
            startNode,
            goalNode,
            startX: typeof record?.worldX === 'number' ? record.worldX : null,
            startY: typeof record?.worldY === 'number' ? record.worldY : null,
        });

        if (!Array.isArray(route) || route.length === 0) {
            return null;
        }

        const legs = route.map((edge) => ({
            type: 'PORTAL',
            scene: edge.fromScene,
            roomId: edge.fromRoomId,
            x: edge.fromX,
            y: edge.fromY,
            toScene: edge.toScene,
            toRoomId: edge.toRoomId,
            toX: edge.toX,
            toY: edge.toY,
            portalId: edge.portalId ?? null,
        }));

        legs.push({
            type: 'STATIC',
            scene: targetScene,
            roomId: targetScene === 'interior' ? String(targetRoomId) : null,
            x: destination.x,
            y: destination.y,
        });

        return legs;
    }

    _buildPortalGraph() {
        const edges = [];
        const outgoing = new Map();
        const incoming = new Map();
        const addEdge = (edge) => {
            const normalized = {
                fromNode: String(edge.fromNode),
                toNode: String(edge.toNode),
                fromScene: edge.fromScene,
                fromRoomId: edge.fromRoomId != null ? String(edge.fromRoomId) : null,
                fromX: Math.floor(edge.fromX),
                fromY: Math.floor(edge.fromY),
                toScene: edge.toScene,
                toRoomId: edge.toRoomId != null ? String(edge.toRoomId) : null,
                toX: Number.isFinite(edge.toX) ? Math.floor(edge.toX) : null,
                toY: Number.isFinite(edge.toY) ? Math.floor(edge.toY) : null,
                portalId: edge.portalId ?? null,
                index: edges.length,
            };

            edges.push(normalized);
            if (!outgoing.has(normalized.fromNode)) outgoing.set(normalized.fromNode, []);
            if (!incoming.has(normalized.toNode)) incoming.set(normalized.toNode, []);
            outgoing.get(normalized.fromNode).push(normalized);
            incoming.get(normalized.toNode).push(normalized);
        };

        const rooms = ROOMS && typeof ROOMS === 'object' ? Object.values(ROOMS) : [];
        rooms.forEach((roomConfig) => {
            const roomId = roomConfig?.id;
            const features = roomConfig?.roomData?.featureList;
            if (roomId == null || !Array.isArray(features)) {
                return;
            }

            const sourceRoomId = String(roomId);
            const sourceWallHeight = Number(roomConfig?.wallHeight ?? 3);
            const roomOffsetX = 1;
            const roomOffsetY = sourceWallHeight + 1;

            features.forEach((feature) => {
                const portal = feature?.params?.portal;
                if (!portal || portal.room_id == null) {
                    return;
                }

                const sourceX = roomOffsetX + Math.floor(Number(feature?.x ?? 0));
                const sourceY = roomOffsetY + Math.floor(Number(feature?.y ?? 0));
                const rawTarget = String(portal.room_id);

                if (rawTarget === '-1') {
                    const exits = this._queryPortalIndexByRoomId(sourceRoomId);
                    exits.forEach((entry) => {
                        if (typeof entry?.x !== 'number' || typeof entry?.y !== 'number') {
                            return;
                        }

                        addEdge({
                            fromNode: sourceRoomId,
                            toNode: '-1',
                            fromScene: 'interior',
                            fromRoomId: sourceRoomId,
                            fromX: sourceX,
                            fromY: sourceY,
                            toScene: 'exterior',
                            toRoomId: null,
                            toX: entry.x,
                            toY: entry.y + 1,
                            portalId: entry.portalId ?? null,
                        });
                    });
                    return;
                }

                addEdge({
                    fromNode: sourceRoomId,
                    toNode: rawTarget,
                    fromScene: 'interior',
                    fromRoomId: sourceRoomId,
                    fromX: sourceX,
                    fromY: sourceY,
                    toScene: 'interior',
                    toRoomId: rawTarget,
                    toX: Number.isFinite(Number(portal.x)) ? Number(portal.x) : null,
                    toY: Number.isFinite(Number(portal.y)) ? Number(portal.y) : null,
                    portalId: portal.portalId ?? null,
                });
            });
        });

        const exteriorPortals = this._queryPortalIndexByRoomId(null, true);
        exteriorPortals.forEach((entry) => {
            const roomId = entry?.room_id != null ? String(entry.room_id) : null;
            if (roomId == null || roomId === '-1') {
                return;
            }

            if (typeof entry?.x !== 'number' || typeof entry?.y !== 'number') {
                return;
            }

            const interiorEntry = this._resolveInteriorBootstrapPortal(roomId, { x: 0, y: 0 });
            const arrivalX = interiorEntry?.x ?? null;
            const arrivalY = interiorEntry?.y ?? null;

            addEdge({
                fromNode: '-1',
                toNode: roomId,
                fromScene: 'exterior',
                fromRoomId: null,
                fromX: entry.x,
                fromY: entry.y + 1,
                toScene: 'interior',
                toRoomId: roomId,
                toX: arrivalX,
                toY: arrivalY,
                portalId: entry.portalId ?? null,
            });
        });

        return { edges, outgoing, incoming };
    }

    _findShortestPortalRoute(graph, options = {}) {
        const startNode = String(options.startNode);
        const goalNode = String(options.goalNode);
        const startX = options.startX;
        const startY = options.startY;
        const outgoing = graph?.outgoing ?? new Map();
        const incoming = graph?.incoming ?? new Map();

        if (startNode === goalNode) {
            return [];
        }

        const distances = new Map();
        const queue = [goalNode];
        distances.set(goalNode, 0);

        while (queue.length > 0) {
            const node = queue.shift();
            const nodeDistance = distances.get(node) ?? 0;
            const inEdges = incoming.get(node) ?? [];
            for (let i = 0; i < inEdges.length; i++) {
                const edge = inEdges[i];
                if (!distances.has(edge.fromNode)) {
                    distances.set(edge.fromNode, nodeDistance + 1);
                    queue.push(edge.fromNode);
                }
            }
        }

        if (!distances.has(startNode)) {
            return null;
        }

        const selected = [];
        let node = startNode;
        let cursorX = Number.isFinite(startX) ? startX : null;
        let cursorY = Number.isFinite(startY) ? startY : null;
        let guard = 0;

        while (node !== goalNode && guard < 128) {
            guard += 1;
            const nodeDistance = distances.get(node);
            const candidates = (outgoing.get(node) ?? []).filter((edge) => {
                return distances.has(edge.toNode) && distances.get(edge.toNode) === nodeDistance - 1;
            });

            if (candidates.length === 0) {
                return null;
            }

            candidates.sort((a, b) => {
                const aDistance = (cursorX == null || cursorY == null)
                    ? 0
                    : (Math.abs((a.fromX ?? 0) - cursorX) + Math.abs((a.fromY ?? 0) - cursorY));
                const bDistance = (cursorX == null || cursorY == null)
                    ? 0
                    : (Math.abs((b.fromX ?? 0) - cursorX) + Math.abs((b.fromY ?? 0) - cursorY));
                if (aDistance !== bDistance) {
                    return aDistance - bDistance;
                }
                return (a.index ?? 0) - (b.index ?? 0);
            });

            const picked = candidates[0];
            selected.push(picked);
            node = picked.toNode;
            cursorX = Number.isFinite(picked.toX) ? picked.toX : null;
            cursorY = Number.isFinite(picked.toY) ? picked.toY : null;
        }

        if (node !== goalNode) {
            return null;
        }

        return selected;
    }

    _getPortalIndex() {
        const live = this.scene?.exterior?.portalIndex;
        if (Array.isArray(live) && live.length > 0) {
            this.portalIndexCache = live;
            return live;
        }

        if (Array.isArray(this.portalIndexCache) && this.portalIndexCache.length > 0) {
            return this.portalIndexCache;
        }

        return [];
    }

    _queryPortalIndexByRoomId(roomId = null, includeAll = false) {
        const portalIndex = this._getPortalIndex();
        if (!Array.isArray(portalIndex) || portalIndex.length === 0) {
            return [];
        }

        if (includeAll) {
            return portalIndex;
        }

        return portalIndex.filter((entry) => String(entry?.room_id) === String(roomId));
    }

    advancePortalLeg(record, leg) {
        if (!record || !record.activePlan || !leg || leg.type !== 'PORTAL') {
            return false;
        }

        this._traceRecord('advancePortalLeg:before', record, {
            portalToScene: leg.toScene,
            portalToRoomId: leg.toRoomId,
            portalToX: leg.toX,
            portalToY: leg.toY,
        });

        record.scene = leg.toScene;
        record.roomId = leg.toScene === 'interior'
            ? (leg.toRoomId != null ? String(leg.toRoomId) : null)
            : null;

        if (typeof leg.toX === 'number' && typeof leg.toY === 'number') {
            record.worldX = leg.toX;
            record.worldY = leg.toY;
        }

        const legs = Array.isArray(record.activePlan.legs) ? record.activePlan.legs : [];
        if (record.currentLegIndex < legs.length - 1) {
            record.currentLegIndex += 1;
        }

        this._traceRecord('advancePortalLeg:after', record);

        return true;
    }

    advanceOffscreenTowardScene(record, sceneId, roomId = null) {
        if (!record || record.mode !== 'SCHEDULED' || !record.activePlan) {
            return false;
        }

        const traceStartScene = record.scene ?? null;
        const traceStartRoomId = record.roomId ?? null;
        const traceStartLegIndex = Number.isInteger(record.currentLegIndex) ? record.currentLegIndex : 0;

        const legs = Array.isArray(record.activePlan.legs) ? record.activePlan.legs : [];
        if (legs.length === 0) {
            return false;
        }

        const isVisibleLeg = (leg) => {
            if (!leg || leg.scene !== sceneId) {
                return false;
            }
            if (sceneId !== 'interior') {
                return true;
            }
            return String(leg.roomId ?? '') === String(roomId ?? '');
        };

        // Only advance while the remaining route can become visible in the
        // currently active scene/room. If no remaining leg is visible here,
        // keep current state and wait for the player to transition scenes.
        const startIdx = Math.max(0, Math.min(record.currentLegIndex ?? 0, legs.length - 1));
        let hasVisibleRemainingLeg = false;
        for (let i = startIdx; i < legs.length; i++) {
            if (isVisibleLeg(legs[i])) {
                hasVisibleRemainingLeg = true;
                break;
            }
        }

        if (!hasVisibleRemainingLeg) {
            return false;
        }

        let changed = false;
        let guard = 0;
        while (guard < 32) {
            guard += 1;
            const idx = Math.max(0, Math.min(record.currentLegIndex ?? 0, legs.length - 1));
            const leg = legs[idx];
            if (!leg) {
                break;
            }

            const beforeScene = record.scene ?? null;
            const beforeRoomId = record.roomId ?? null;
            const beforeX = record.worldX;
            const beforeY = record.worldY;
            const beforeLegIndex = Number.isInteger(record.currentLegIndex) ? record.currentLegIndex : 0;

            if (isVisibleLeg(leg)) {
                const sceneMismatch = (record.scene ?? null) !== (leg.scene ?? null);
                const roomMismatch = String(record.roomId ?? '') !== String(leg.roomId ?? '');
                const posMissing = !(typeof record.worldX === 'number' && typeof record.worldY === 'number');
                if (sceneMismatch || roomMismatch || posMissing) {
                    record.scene = leg.scene ?? record.scene;
                    record.roomId = leg.scene === 'interior'
                        ? (leg.roomId != null ? String(leg.roomId) : null)
                        : null;

                    if (typeof leg.x === 'number' && typeof leg.y === 'number') {
                        record.worldX = leg.x;
                        record.worldY = leg.y;
                    }
                }

                const mutated =
                    beforeScene !== (record.scene ?? null) ||
                    String(beforeRoomId ?? '') !== String(record.roomId ?? '') ||
                    beforeX !== record.worldX ||
                    beforeY !== record.worldY ||
                    beforeLegIndex !== (record.currentLegIndex ?? beforeLegIndex);
                changed = changed || mutated;
                break;
            }

            let advancedToNextLeg = false;

            if (leg.type === 'PORTAL') {
                record.scene = leg.toScene;
                record.roomId = leg.toScene === 'interior'
                    ? (leg.toRoomId != null ? String(leg.toRoomId) : null)
                    : null;

                if (typeof leg.toX === 'number' && typeof leg.toY === 'number') {
                    record.worldX = leg.toX;
                    record.worldY = leg.toY;
                }
                else {
                    const nextLeg = legs[idx + 1] ?? null;
                    if (nextLeg && typeof nextLeg.x === 'number' && typeof nextLeg.y === 'number') {
                        record.worldX = nextLeg.x;
                        record.worldY = nextLeg.y;
                    }
                }
            }
            else {
                record.scene = leg.scene ?? record.scene;
                record.roomId = leg.scene === 'interior'
                    ? (leg.roomId != null ? String(leg.roomId) : null)
                    : null;
                if (typeof leg.x === 'number' && typeof leg.y === 'number') {
                    record.worldX = leg.x;
                    record.worldY = leg.y;
                }
            }

            if (record.currentLegIndex < legs.length - 1) {
                record.currentLegIndex += 1;
                record._lastDispatchedLegKey = null;
                advancedToNextLeg = true;
            }

            const mutated =
                beforeScene !== (record.scene ?? null) ||
                String(beforeRoomId ?? '') !== String(record.roomId ?? '') ||
                beforeX !== record.worldX ||
                beforeY !== record.worldY ||
                beforeLegIndex !== (record.currentLegIndex ?? beforeLegIndex);

            if (!mutated) {
                break;
            }

            changed = true;

            if (advancedToNextLeg) {
                continue;
            }

            break;
        }

        const traceEndScene = record.scene ?? null;
        const traceEndRoomId = record.roomId ?? null;
        const traceEndLegIndex = Number.isInteger(record.currentLegIndex) ? record.currentLegIndex : traceStartLegIndex;
        const sceneOrRoomChanged =
            traceStartScene !== traceEndScene ||
            String(traceStartRoomId ?? '') !== String(traceEndRoomId ?? '');

        if (changed) {
            this._traceRecord('advanceOffscreenTowardScene:end', record, {
                changed,
                sceneOrRoomChanged,
                targetScene: sceneId,
                targetRoomId: roomId,
                fromScene: traceStartScene,
                fromRoomId: traceStartRoomId,
                fromLegIndex: traceStartLegIndex,
                toLegIndex: traceEndLegIndex,
            });
        }
        return changed;
    }

    _arrivalZonesEqual(left, right) {
        if (left == null && right == null) {
            return true;
        }

        if (left == null || right == null) {
            return false;
        }

        return left.startX === right.startX &&
            left.startY === right.startY &&
            left.endX === right.endX &&
            left.endY === right.endY;
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
        r._lastDispatchedLegKey = null;
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

    _pickResumeLegIndex(planLegs, savedScene, savedRoomId, savedWorldX, savedWorldY, fallbackIndex = 0) {
        const legs = Array.isArray(planLegs) ? planLegs : [];
        const maxLegIndex = Math.max(0, legs.length - 1);
        const fallback = Math.max(0, Math.min(Number.isInteger(fallbackIndex) ? fallbackIndex : 0, maxLegIndex));
        if (legs.length === 0) {
            return 0;
        }

        const targetScene = savedScene ?? null;
        const targetRoom = targetScene === 'interior' ? String(savedRoomId ?? '') : '';
        const hasSavedPos = typeof savedWorldX === 'number' && typeof savedWorldY === 'number';

        let bestIndex = -1;
        let bestScore = Number.POSITIVE_INFINITY;

        for (let i = 0; i < legs.length; i++) {
            const leg = legs[i] ?? null;
            if (!leg || (leg.scene ?? null) !== targetScene) {
                continue;
            }

            if (targetScene === 'interior' && String(leg.roomId ?? '') !== targetRoom) {
                continue;
            }

            let score = 1000 + Math.abs(i - fallback);
            if (hasSavedPos && typeof leg.x === 'number' && typeof leg.y === 'number') {
                score = Math.abs(leg.x - savedWorldX) + Math.abs(leg.y - savedWorldY);
                if (score === 0) {
                    return i;
                }
            }

            if (score < bestScore) {
                bestScore = score;
                bestIndex = i;
            }
        }

        if (bestIndex >= 0) {
            return bestIndex;
        }

        return fallback;
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
            if (typeof saved.worldX === 'number') record.worldX = saved.worldX;
            if (typeof saved.worldY === 'number') record.worldY = saved.worldY;

            if (this.debug) console.log(`[NpcSchedule] fromSaveData ${slug}: restored`, { worldX: saved.worldX, worldY: saved.worldY, scene: record.scene, mode: saved.mode });
            this._traceRecord('fromSaveData:restored', record, {
                savedWorldX: saved.worldX,
                savedWorldY: saved.worldY,
                savedScene: saved.scene,
                savedRoomId: saved.roomId,
                savedLegIndex: saved.currentLegIndex,
                savedRuleId: saved.activePlanRuleId,
            });

            // Always replan to update active plan for current time (unless FOLLOWING_PLAYER).
            // Keep saved world position and leg index so in-progress travel does not
            // restart from the first leg when scenes reload.
            if (saved.mode !== 'FOLLOWING_PLAYER') {
                const savedWorldX = record.worldX;
                const savedWorldY = record.worldY;
                const savedScene = record.scene;
                const savedRoomId = record.roomId;
                const savedLegIndex = Number.isInteger(record.currentLegIndex) ? record.currentLegIndex : 0;
                const savedRuleId = saved.activePlanRuleId ?? null;
                const replanOk = this._replan(record, now);
                if (!replanOk) {
                    record.worldX = savedWorldX;
                    record.worldY = savedWorldY;
                    record.scene = savedScene;
                    record.roomId = savedRoomId;
                    record.currentLegIndex = savedLegIndex;
                }
                else {
                    const activeRuleId = record.activePlan?.ruleId ?? null;
                    if (savedRuleId != null && savedRuleId === activeRuleId) {
                        const planLegs = Array.isArray(record.activePlan?.legs) ? record.activePlan.legs : [];
                        record.currentLegIndex = this._pickResumeLegIndex(
                            planLegs,
                            savedScene,
                            savedRoomId,
                            savedWorldX,
                            savedWorldY,
                            savedLegIndex,
                        );
                        record.scene = savedScene;
                        record.roomId = savedScene === 'interior' ? savedRoomId : null;
                        record.worldX = savedWorldX;
                        record.worldY = savedWorldY;
                        record._lastDispatchedLegKey = null;
                    }
                }
                if (this.debug) console.log(`[NpcSchedule] fromSaveData ${slug}: replan result=${replanOk}, now at (${record.worldX}, ${record.worldY})`);
                this._traceRecord('fromSaveData:afterReplan', record, {
                    replanOk,
                    resumedLegIndex: record.currentLegIndex,
                });
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
                _lastDispatchedLegKey: null,
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
                return {
                    x: portalFromIndex.x + Math.floor(destination.x ?? 0),
                    y: portalFromIndex.y + 1 + Math.floor(destination.y ?? 0)
                };
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

    _resolveArrivalZone(arrivalZone = null, destination = null) {
        if (!arrivalZone || typeof arrivalZone !== 'object' || !destination) {
            return null;
        }

        const startX = Number(arrivalZone.startX);
        const startY = Number(arrivalZone.startY);
        const endX = Number(arrivalZone.endX);
        const endY = Number(arrivalZone.endY);
        if (!Number.isFinite(startX) || !Number.isFinite(startY) || !Number.isFinite(endX) || !Number.isFinite(endY)) {
            return null;
        }

        const absoluteStartX = destination.x + Math.floor(startX);
        const absoluteStartY = destination.y + Math.floor(startY);
        const absoluteEndX = destination.x + Math.floor(endX);
        const absoluteEndY = destination.y + Math.floor(endY);

        return {
            startX: Math.min(absoluteStartX, absoluteEndX),
            startY: Math.min(absoluteStartY, absoluteEndY),
            endX: Math.max(absoluteStartX, absoluteEndX),
            endY: Math.max(absoluteStartY, absoluteEndY),
        };
    }

    _queryPortalIndexByAddress(dir, number, street) {
        const portalIndex = this._getPortalIndex();
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