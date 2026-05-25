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
    constructor(basePath = '/assets/chunks/') {
        this.basePath = basePath;
        this._cache   = new Map(); // key → raw JSON (prevents double-fetches)
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
        const key  = chunk.key;
        const url  = `${this.basePath}chunk_${chunk.chunkX}_${chunk.chunkY}.json`;

        try {
            let data;
            if (this._cache.has(key)) {
                data = this._cache.get(key);
            } else {
                const response = await fetch(url);
                if (!response.ok) return false;
                data = await response.json();
                this._cache.set(key, data);
            }

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
        // Stub — implement once persistence pipeline is ready.
        console.warn(`WorldDataLoader.saveChunk: not yet implemented for chunk ${chunk.key}`);
        return false;
    }

    /** Clear the in-memory JSON cache (e.g. after a scene reset). */
    clearCache() {
        this._cache.clear();
    }
}
