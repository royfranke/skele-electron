export default class NpcRuntimeProjector {
    constructor(scene, npcManager) {
        this.scene = scene;
        this.npcManager = npcManager;          // scene-local NpcManager (sprite layer)
        this.scheduler = scene.manager.npcSchedule;
        this.traceEnabled = true;
        this.traceNpcSlug = 'AUNTIE';
        this.traceConsoleEnabled = false;
        this.traceMaxEntries = 120;
        this.traceDedupeWindowMs = 1200;
        this._lastTraceFingerprint = null;
        this._lastTraceAt = 0;
    }

    _trace(record, context, extra = null) {
        if (!this.traceEnabled || !record || record.slug !== this.traceNpcSlug) {
            return;
        }

        const isTransitionContext = context === 'spawned' ||
            context === 'dispatchLeg' ||
            context === 'portalArrive';
        if (!isTransitionContext) {
            return;
        }

        const payload = {
            sceneId: this._sceneId(),
            roomId: this._roomId(),
            recordScene: record.scene,
            recordRoomId: record.roomId,
            worldX: record.worldX,
            worldY: record.worldY,
            legIndex: record.currentLegIndex,
            planRuleId: record.activePlan?.ruleId ?? null,
            spawnedScene: record.spawnedScene,
        };
        if (extra && typeof extra === 'object') {
            Object.assign(payload, extra);
        }

        const fingerprint = JSON.stringify({
            context,
            sceneId: payload.sceneId,
            roomId: payload.roomId,
            recordScene: payload.recordScene,
            recordRoomId: payload.recordRoomId,
            worldX: payload.worldX,
            worldY: payload.worldY,
            legIndex: payload.legIndex,
            legType: payload.legType ?? null,
            legScene: payload.legScene ?? null,
            legRoomId: payload.legRoomId ?? null,
            legToScene: payload.legToScene ?? null,
            legToRoomId: payload.legToRoomId ?? null,
            spawnX: payload.spawnX ?? null,
            spawnY: payload.spawnY ?? null,
        });

        const now = Date.now();
        if (this._lastTraceFingerprint === fingerprint && (now - this._lastTraceAt) < this.traceDedupeWindowMs) {
            return;
        }
        this._lastTraceFingerprint = fingerprint;
        this._lastTraceAt = now;

        payload.context = `projector:${context}`;
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
            console.log(`[NPC_TRACE] projector:${context}`, payload);
        }
    }

    // Called by NpcManager on scene create — spawn any NPCs that should be here now
    projectAll() {
        if (!this.scheduler || !this.scheduler.registry) {
            return;
        }

        for (const [slug, record] of this.scheduler.registry) {
            this._reconcile(record);
        }
    }

    // Called each time a chunk loads — check if any scheduled NPC belongs here now
    onChunkLoad(chunk) {
        if (!chunk || !this.scheduler || !this.scheduler.registry) {
            return;
        }

        for (const [slug, record] of this.scheduler.registry) {
            this._reconcile(record);
        }
    }

    // Called by NpcManager.update() after all runtime NPCs update
    // — checks for leg completion, drives WALK/WAIT legs
    updateAll() {
        if (!this.scheduler || !this.scheduler.registry) {
            return;
        }

        for (const [slug, record] of this.scheduler.registry) {
            this._reconcile(record);

            if (record.spawnedScene !== this._sceneId()) continue;
            if (record.mode === 'FOLLOWING_PLAYER') {
                // Follow mode is driven by runtime NPC behavior; keep record position synced.
                const npc = this.npcManager.getNpcBySlug(record.slug);
                this._syncRecordFromRuntime(record, npc);
                continue;
            }
            this._driveLeg(record);
        }
    }

    // Spawn or despawn NPC sprite based on whether it should be in this scene/chunk
    _reconcile(record) {
        if (!record || !record.slug) {
            return;
        }

        if (this.scheduler && typeof this.scheduler.ensurePlanned === 'function') {
            this.scheduler.ensurePlanned(record);
        }

        if (record.mode === 'SCHEDULED' && this.scheduler && typeof this.scheduler.advanceOffscreenTowardScene === 'function') {
            this.scheduler.advanceOffscreenTowardScene(record, this._sceneId(), this._roomId());
        }

        const sceneId = this._sceneId();
        const existing = this.npcManager.getNpcBySlug(record.slug);
        const shouldBeInScene = this._recordBelongsToScene(record, sceneId);
        const validPos = this._hasValidWorldPosition(record);

        if (!shouldBeInScene) {
            if (existing) {
                this.npcManager.discardNpcBySlug(record.slug);
            }
            if (record.spawnedScene === sceneId) {
                record.spawnedScene = null;
                record.runtimeNpc = null;
            }
            return;
        }

        if (!validPos) {
            return;
        }

        if (!existing) {
            const npc = this.npcManager.newNpcToWorld(record.worldX, record.worldY, record.slug);
            if (!npc) {
                return;
            }

            this._applyFollowMode(record, npc);
            this._applyRecordPose(record, npc);
            record.spawnedScene = sceneId;
            record.runtimeNpc = npc;
            this._trace(record, 'spawned', {
                spawnX: record.worldX,
                spawnY: record.worldY,
            });
            return;
        }

        record.spawnedScene = sceneId;
        record.runtimeNpc = existing;

        if (record.mode === 'FOLLOWING_PLAYER') {
            // While following, trust runtime movement and never snap to scheduled tile.
            this._applyFollowMode(record, existing);
            this._syncRecordFromRuntime(record, existing);
            return;
        }

        if (Array.isArray(existing.destinations) && existing.destinations.length > 0) {
            // Let scheduled travel finish without despawning/recreating the NPC mid-route.
            this._syncRecordFromRuntime(record, existing);
            return;
        }

        const tile = existing.standingTile;
        const tileMatches = !!(tile && tile.x === record.worldX && tile.y === record.worldY);
        if (!tileMatches) {
            this.npcManager.discardNpcBySlug(record.slug);
            const npc = this.npcManager.newNpcToWorld(record.worldX, record.worldY, record.slug);
            if (!npc) {
                record.spawnedScene = null;
                record.runtimeNpc = null;
                return;
            }

            this._applyFollowMode(record, npc);
            this._applyRecordPose(record, npc);
            record.spawnedScene = sceneId;
            record.runtimeNpc = npc;
        }
    }

    // Move runtime NPC through current leg (WALK, WAIT_AT_BUS, etc.)
    _driveLeg(record) {
        if (!record || !record.slug) {
            return;
        }

        const npc = this.npcManager.getNpcBySlug(record.slug);
        if (!npc) {
            return;
        }

        const legs = Array.isArray(record.activePlan?.legs) ? record.activePlan.legs : [];
        const legIndex = Math.max(0, Math.min(record.currentLegIndex ?? 0, Math.max(legs.length - 1, 0)));
        const currentLeg = legs[legIndex] ?? null;
        const hasDestination = !!(currentLeg &&
            typeof currentLeg.x === 'number' &&
            typeof currentLeg.y === 'number');
        const planVersion = typeof record.planVersion === 'number' ? record.planVersion : 0;
        const legKey = hasDestination
            ? `${planVersion}:${legIndex}:${currentLeg.type}:${currentLeg.x}:${currentLeg.y}`
            : null;
        const dispatchedLegKey = typeof record._lastDispatchedLegKey === 'string' ? record._lastDispatchedLegKey : null;

        if (hasDestination && legKey !== dispatchedLegKey) {
            npc.moveToTile(currentLeg.x, currentLeg.y);
            record._lastDispatchedLegKey = legKey;
            if (currentLeg.type === 'PORTAL') {
                this._trace(record, 'dispatchLeg', {
                    legType: currentLeg.type,
                    legScene: currentLeg.scene,
                    legRoomId: currentLeg.roomId,
                    legX: currentLeg.x,
                    legY: currentLeg.y,
                });
                this._setPortalDoorState(currentLeg, 'OPENING');
            }
        }

        if (npc.standingTile && typeof npc.standingTile.x === 'number' && typeof npc.standingTile.y === 'number') {
            record.worldX = npc.standingTile.x;
            record.worldY = npc.standingTile.y;

            if (hasDestination && npc.destinations.length === 0 && npc.standingTile.x === currentLeg.x && npc.standingTile.y === currentLeg.y) {
                let advanced = false;
                if (currentLeg.type === 'PORTAL') {
                    this._setPortalDoorState(currentLeg, 'CLOSING');
                    if (this.scheduler && typeof this.scheduler.advancePortalLeg === 'function') {
                        advanced = this.scheduler.advancePortalLeg(record, currentLeg) === true;
                    }
                    this._trace(record, 'portalArrive', {
                        legToScene: currentLeg.toScene,
                        legToRoomId: currentLeg.toRoomId,
                        legToX: currentLeg.toX,
                        legToY: currentLeg.toY,
                    });
                }
                else if (legIndex < Math.max(legs.length - 1, 0)) {
                    record.currentLegIndex = legIndex + 1;
                    advanced = true;
                }

                if (advanced) {
                    record._lastDispatchedLegKey = null;
                }
                record._lastDispatchedPlanVersion = planVersion;
                return;
            }
        }

        this._applyRecordPose(record, npc);
    }

    _setPortalDoorState(leg, stateName) {
        if (!leg || leg.type !== 'PORTAL') {
            return;
        }

        if (leg.scene !== this._sceneId()) {
            return;
        }

        if (leg.scene === 'interior' && String(leg.roomId ?? '') !== String(this._roomId() ?? '')) {
            return;
        }

        const registry = this.scene?.manager?.objectManager?.registry;
        if (!registry || typeof registry.getObjects !== 'function' || typeof registry.getObjectsAround !== 'function') {
            return;
        }

        const here = registry.getObjects(leg.x, leg.y) ?? [];
        const around = registry.getObjectsAround(leg.x, leg.y) ?? [];
        const objects = [...here, ...around];
        if (!Array.isArray(objects) || objects.length === 0) {
            return;
        }

        const desiredRoomId = leg.portalRoomId != null
            ? String(leg.portalRoomId)
            : (leg.toScene === 'interior' ? String(leg.toRoomId ?? '') : '-1');

        const portalObject = objects.find((obj) => {
            if (!obj || typeof obj.setState !== 'function' || obj.portal == null) {
                return false;
            }

            if (leg.portalId != null && obj.portal?.portalId != null) {
                return String(obj.portal.portalId) === String(leg.portalId);
            }

            return String(obj.portal?.room_id ?? '') === desiredRoomId;
        });

        if (!portalObject) {
            return;
        }

        try {
            portalObject.setState(stateName);
        } catch (_e) {
            // Ignore state failures for non-door portal objects.
        }
    }

    _sceneId() {
        return this.scene.place; // 'exterior' | 'interior'
    }

    _roomId() {
        return this.scene.room_id;
    }

    _recordBelongsToScene(record, sceneId) {
        if (record?.mode === 'FOLLOWING_PLAYER') {
            return true;
        }

        const desiredScene = record.scene ?? (record.activePlan?.indoors ? 'interior' : 'exterior');
        if (desiredScene !== sceneId) {
            return false;
        }

        if (sceneId === 'interior') {
            const requiredRoomId = record.roomId ?? null;
            if (requiredRoomId == null) {
                return true;
            }

            return String(requiredRoomId) === String(this._roomId());
        }

        return true;
    }

    _hasValidWorldPosition(record) {
        return typeof record.worldX === 'number' && typeof record.worldY === 'number';
    }

    _applyRecordPose(record, npc) {
        if (!npc) {
            return;
        }

        if (Array.isArray(npc.destinations) && npc.destinations.length > 0) {
            return;
        }

        const facing = record?.facing ?? record?.activePlan?.arrivalFacing;
        if (typeof facing === 'string') {
            npc.facing = facing;
        }

        const action = record?.activePlan?.arrivalAction;
        if (typeof action === 'string' && typeof npc.setState === 'function') {
            npc.setState(action);
        }
    }

    _syncRecordFromRuntime(record, npc) {
        if (!record || !npc || !npc.standingTile) {
            return;
        }

        const { x, y } = npc.standingTile;
        if (typeof x === 'number' && typeof y === 'number') {
            record.worldX = x;
            record.worldY = y;
        }
    }

    _applyFollowMode(record, npc) {
        if (!record || !npc) {
            return;
        }

        if (record.mode !== 'FOLLOWING_PLAYER') {
            npc.following = null;
            return;
        }

        const followObject = record.followTarget === 'PLAYER' ? this.scene.player : null;
        if (!followObject) {
            npc.following = null;
            return;
        }

        npc.following = {
            follow: followObject,
            distance: typeof record.followDistance === 'number' ? record.followDistance : 1,
        };
    }

    
}