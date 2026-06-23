export default class NpcRuntimeProjector {
    constructor(scene, npcManager) {
        this.scene = scene;
        this.npcManager = npcManager;          // scene-local NpcManager (sprite layer)
        this.scheduler = scene.manager.npcSchedule;
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
                // delegate entirely to Npc.follow()
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

        const sceneId = this._sceneId();
        const existing = this.npcManager.getNpcBySlug(record.slug);
        const shouldBeInScene = this._recordBelongsToScene(record, sceneId);
        const validPos = this._hasValidWorldPosition(record);

        if (record.slug === 'PATRICE') {
            console.log(`[NPC_PROJECTOR_DEBUG] slug=${record.slug} frameSpawnCheck=1 scene=${sceneId} desiredScene=${record.scene ?? 'null'} shouldBeInScene=${shouldBeInScene} validPos=${validPos} existing=${!!existing} world=${record.worldX},${record.worldY}`);
        }

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

            this._applyRecordPose(record, npc);
            record.spawnedScene = sceneId;
            record.runtimeNpc = npc;
            return;
        }

        record.spawnedScene = sceneId;
        record.runtimeNpc = existing;

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

        if (npc.standingTile && typeof npc.standingTile.x === 'number' && typeof npc.standingTile.y === 'number') {
            record.worldX = npc.standingTile.x;
            record.worldY = npc.standingTile.y;
        }

        this._applyRecordPose(record, npc);
    }

    _sceneId() {
        return this.scene.place; // 'exterior' | 'interior'
    }

    _roomId() {
        return this.scene.room_id;
    }

    _recordBelongsToScene(record, sceneId) {
        const desiredScene = record.scene ?? (record.activePlan?.indoors ? 'interior' : 'exterior');
        if (desiredScene !== sceneId) {
            return false;
        }

        if (sceneId === 'interior') {
            const requiredRoomId = record.roomId ?? record.activePlan?.roomId ?? null;
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

        const facing = record?.facing ?? record?.activePlan?.arrivalFacing;
        if (typeof facing === 'string') {
            npc.facing = facing;
        }

        const action = record?.activePlan?.arrivalAction;
        if (typeof action === 'string' && typeof npc.setState === 'function') {
            npc.setState(action);
        }
    }

    
}