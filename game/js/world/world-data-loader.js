/**
 * WorldDataLoader
 *
 * Responsible for fetching chunk JSON files and hydrating Chunk instances.
 * Currently a stub — chunks are populated by the existing ExteriorManager
 * procedural build path until the Tiled export pipeline is in place.
 *
 * Future usage:
 *   const loader = new WorldDataLoader('/assets/chunks/');
 *   const chunk  = await loader.loadChunk(2, 3); // loads chunk_2_3.json
 */
export default class WorldDataLoader {

    /**
     * @param {string} basePath  Path prefix for chunk JSON files.
     */
    constructor(basePath = '/assets/chunks/', options = {}) {
        this.basePath = basePath;
        this._cache   = new Map(); // key → raw JSON (prevents double-fetches)
        this._canUseElectronApi = typeof window !== 'undefined' && window.api && typeof window.api.invoke === 'function';
        this.slot = options.slot ?? null;
    }

    // ─── Async load ───────────────────────────────────────────────────────────

    /**
     * Load and return chunk data for the given chunk coords.
     * Returns null if the file does not exist (gracefully handled).
     *
     * @param {Chunk} chunk  An empty Chunk instance to hydrate.
     * @returns {Promise<boolean>} true if data was found and applied.
     */
    async loadChunk(chunk) {
        const key  = this.getCacheKey(chunk);
        try {
            if (this._cache.has(key)) {
                chunk.fromJSON(this._cache.get(key));
                return true;
            }

            let data = null;

            if (this._canUseElectronApi) {
                const result = await window.api.invoke('load-chunk', {
                    chunkX: chunk.chunkX,
                    chunkY: chunk.chunkY,
                    slot: this.slot,
                });

                if (result && result.ok === true) {
                    data = result.data;
                }
            } else {
                const url  = `${this.basePath}chunk_${chunk.chunkX}_${chunk.chunkY}.json`;
                const response = await fetch(url);
                if (!response.ok) return false;
                data = await response.json();
            }

            if (data == null) return false;

            this._cache.set(key, data);
            chunk.fromJSON(data);
            return true;

        } catch (_err) {
            // File not found or parse error — chunk stays unpopulated.
            return false;
        }
    }

    /**
     * Save a chunk's current state back to its JSON file (Electron only —
     * requires a backend write endpoint or fs access via preload bridge).
     *
     * @param {Chunk} chunk
     * @returns {Promise<boolean>}
     */
    async saveChunk(chunk) {
        if (!this._canUseElectronApi) {
            console.warn(`WorldDataLoader.saveChunk: unavailable outside Electron for chunk ${chunk.key}`);
            return false;
        }

        try {
            const data = chunk.toJSON();
            const result = await window.api.invoke('save-chunk', {
                chunkX: chunk.chunkX,
                chunkY: chunk.chunkY,
                chunkData: data,
                slot: this.slot,
            });

            if (!result || result.ok !== true) {
                console.warn(`WorldDataLoader.saveChunk: failed for chunk ${chunk.key}`, result);
                return false;
            }

            this._cache.set(this.getCacheKey(chunk), data);
            chunk.dirty = false;
            return true;
        } catch (_err) {
            console.warn(`WorldDataLoader.saveChunk: exception for chunk ${chunk.key}`, _err);
            return false;
        }
    }

    getCacheKey(chunk) {
        return `${this.slot ?? 'default'}:${chunk.key}`;
    }

    /** Clear the in-memory JSON cache (e.g. after a scene reset). */
    clearCache() {
        this._cache.clear();
    }
}
