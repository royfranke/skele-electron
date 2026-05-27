/* Minimal WorldSystem abstraction
 * - Lightweight wrapper around chunk storage and `WorldDataLoader`.
 * - Designed to be non-invasive: attaches to `window.WorldSystem` so other
 *   modules can opt-in without changing module loaders.
 */
(function(){
  class WorldSystem {
    constructor(scene, loader, options = {}){
      this.scene = scene;
      this.loader = loader || (window.WorldDataLoader ? new window.WorldDataLoader(scene) : null);
      this.slot = options.slot || null;
      // If a ChunkManager is provided, use it as the authoritative source of chunks.
      this.chunkManager = options.chunkManager || null;
      this.chunks = this.chunkManager ? null : new Map(); // fall back when no chunkManager
      this.dirty = new Set(); // set of chunk keys that need saving (used if no chunkManager)
    }

    getChunkKey(x, y){ return `${x}_${y}`; }

    hasChunk(x, y){
      const key = this.getChunkKey(x,y);
      if (this.chunkManager) return this.chunkManager.getAllChunks().some(c => c.key === key);
      return this.chunks.has(key);
    }

    getChunk(x, y){
      const key = this.getChunkKey(x,y);
      if (this.chunkManager) return this.chunkManager.getChunk(x, y);
      return this.chunks.get(key);
    }

    registerChunk(chunk){
      const k = this.getChunkKey((chunk.cx !== undefined) ? chunk.cx : chunk.x, (chunk.cy !== undefined) ? chunk.cy : chunk.y);
      if (this.chunkManager) {
        try { this.chunkManager.registerChunk(chunk); } catch (e) {}
      }
      else {
        this.chunks.set(k, chunk);
      }
    }

    markDirty(chunk){
      if (this.chunkManager) {
        try { chunk.dirty = true; } catch (e) {}
      }
      else {
        const k = this.getChunkKey((chunk.cx !== undefined) ? chunk.cx : chunk.x, (chunk.cy !== undefined) ? chunk.cy : chunk.y);
        this.dirty.add(k);
      }
    }

    clearDirtyFor(chunk){
      if (this.chunkManager) {
        try { chunk.dirty = false; } catch (e) {}
      }
      else {
        const k = this.getChunkKey((chunk.cx !== undefined) ? chunk.cx : chunk.x, (chunk.cy !== undefined) ? chunk.cy : chunk.y);
        this.dirty.delete(k);
      }
    }

    async loadChunk(x, y){
      if(!this.loader) return null;
      const key = this.getChunkKey(x,y);
      const data = await this.loader.loadChunk(x, y, this.slot);
      if(data) {
        if (this.chunkManager) {
          try { this.chunkManager.registerChunk(data); } catch (e) {}
        } else {
          this.chunks.set(key, data);
        }
      }
      return data;
    }

    async saveChunkByKey(key){
      if(!this.loader) return { ok:false, reason:'no-loader' };
      const [xs, ys] = key.split('_');
      const x = Number(xs), y = Number(ys);
      const chunk = this.chunkManager ? this.chunkManager.getChunk(x, y) : this.chunks.get(key);
      const payload = (chunk && typeof chunk.toJSON === 'function') ? chunk.toJSON() : chunk;
      try{
        const res = await this.loader.saveChunk(x, y, payload, this.slot);
        if(res && res.ok) {
          if (this.chunkManager) { try { chunk.dirty = false; } catch (e) {} }
          else { this.dirty.delete(key); }
        }
        return res;
      }catch(e){
        return { ok:false, error: String(e) };
      }
    }

    async saveDirtyChunks(){
      if(!this.loader) return { saved:0, failed:0, dirty:0 };
      if (this.chunkManager) {
        const dirtyChunks = this.chunkManager.getAllChunks().filter(c => c.dirty);
        let saved = 0, failed = 0;
        for (const chunk of dirtyChunks) {
          const key = this.getChunkKey((chunk.cx!==undefined)?chunk.cx:chunk.x, (chunk.cy!==undefined)?chunk.cy:chunk.y);
          const res = await this.saveChunkByKey(key);
          if (res && res.ok) saved++; else failed++;
        }
        return { saved, failed, dirty: dirtyChunks.length };
      }

      // fallback to internal dirty set
      const keys = Array.from(this.dirty);
      let saved = 0, failed = 0;
      for(const key of keys){
        const res = await this.saveChunkByKey(key);
        if(res && res.ok) saved++; else failed++;
      }
      return { saved, failed, dirty: keys.length };
    }
  }

  window.WorldSystem = WorldSystem;
})();
