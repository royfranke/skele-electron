/* EntitySystem
 * - Minimal foundation for dual-form entities (simulation + runtime form).
 * - Provides `Entity` and `EntityManager` with chunk-aware registration.
 */
(function(){
  let _nextId = 1;

  class Entity {
    constructor(kind, slug, worldX, worldY, params = {}){
      this.id = _nextId++;
      this.kind = kind;
      this.slug = slug;
      this.worldX = worldX;
      this.worldY = worldY;
      this.params = params;
      this.spawned = false; // runtime form present
      this.runtime = null; // optional runtime object (sprite)
      this.state = params.state || { name: 'idle' };
    }

    toJSON(){
      return {
        id: this.id,
        kind: this.kind,
        slug: this.slug,
        worldX: this.worldX,
        worldY: this.worldY,
        params: this.params,
        state: this.state,
      };
    }

    update(dt){
      // Simulation hook: extend as needed
    }
  }

  class EntityManager {
    constructor(scene, options = {}){
      this.scene = scene;
      this.chunkManager = options.chunkManager || (scene && scene.exterior && scene.exterior.chunkManager) || null;
      this.entities = new Map(); // id -> Entity
      this.onSpawnRuntime = options.onSpawnRuntime || (()=>{});
      this.onDespawnRuntime = options.onDespawnRuntime || (()=>{});
    }

    addEntity(kind, slug, worldX, worldY, params = {}){
      const e = new Entity(kind, slug, worldX, worldY, params);
      this.entities.set(e.id, e);

      // Register in chunk authoritative store when possible
      if (this.chunkManager) {
        const chunk = this.chunkManager.getChunkAtTile(worldX, worldY);
        if (chunk) {
          const local = chunk.worldToLocal(worldX, worldY);
          if (local) chunk.addEntity(kind, slug, local.x, local.y, params);
        }
      }

      return e;
    }

    removeEntity(id){
      const e = this.entities.get(id);
      if (!e) return false;
      if (this.chunkManager) {
        const chunk = this.chunkManager.getChunkAtTile(e.worldX, e.worldY);
        if (chunk) {
          const local = chunk.worldToLocal(e.worldX, e.worldY);
          if (local) chunk.removeEntity(e.kind, e.slug, local.x, local.y);
        }
      }
      if (e.spawned && this.onDespawnRuntime) {
        try { this.onDespawnRuntime(e); } catch (err) {}
      }
      this.entities.delete(id);
      return true;
    }

    getEntity(id){ return this.entities.get(id); }

    getEntitiesInChunk(chunkX, chunkY){
      const result = [];
      for (const e of this.entities.values()){
        const cx = Math.floor(e.worldX / (this.chunkManager ? this.chunkManager.chunkToWorldTile(1) : 32));
        const cy = Math.floor(e.worldY / (this.chunkManager ? this.chunkManager.chunkToWorldTile(1) : 32));
        if (cx === chunkX && cy === chunkY) result.push(e);
      }
      return result;
    }

    update(dt){
      for (const e of this.entities.values()){
        try { e.update(dt); } catch (err) {}
      }
    }

    spawnRuntimeFor(entity){
      if (!entity || entity.spawned) return null;
      try {
        const runtime = this.onSpawnRuntime(entity) || null;
        entity.runtime = runtime;
        entity.spawned = true;
        return runtime;
      } catch (e) { return null; }
    }

    despawnRuntimeFor(entity){
      if (!entity || !entity.spawned) return;
      try { this.onDespawnRuntime(entity); } catch (e) {}
      entity.runtime = null;
      entity.spawned = false;
    }
  }

  window.EntitySystem = { Entity, EntityManager };
})();
