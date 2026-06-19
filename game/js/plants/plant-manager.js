import PlantFactory from "./plant-factory.js";
import PlantRegistry from "./plant-registry.js";


/* Plant Manager Class */

export default class PlantManager {

    constructor(scene) {
        this.scene = scene;
        this.factory = new PlantFactory(this.scene);
        this.registry = new PlantRegistry();

        this.locale = this.scene[this.scene.place];

        // Debug flag: set to true to show plant age/stage labels
        this.debugLabelsEnabled = false;
    }

    update () {
        // Update debug labels if flag changed
        if (this.debugLabelsEnabled) {
            this._ensureDebugLabelsVisible();
        } else {
            this._hideAllDebugLabels();
        }
    }

    /**
     * Show debug labels on all plants that are currently rendered.
     * @private
     */
    _ensureDebugLabelsVisible() {
        Object.entries(this.registry.registry).forEach(([key, values]) => {
            if (values != null && values.length > 0) {
                values.forEach(plant => {
                    if (plant && plant.registered && !plant.debugLabel) {
                        try {
                            if (typeof plant.setDebugLabel === 'function') {
                                plant.setDebugLabel();
                            }
                        } catch (e) {}
                    }
                });
            }
        });
    }

    /**
     * Hide all debug labels on plants.
     * @private
     */
    _hideAllDebugLabels() {
        Object.entries(this.registry.registry).forEach(([key, values]) => {
            if (values != null && values.length > 0) {
                values.forEach(plant => {
                    if (plant && plant.debugLabel) {
                        try {
                            plant.debugLabel.destroy();
                            plant.debugLabel = undefined;
                        } catch (e) {}
                    }
                });
            }
        });
    }

    /**
     * Age all plants in all loaded chunks by the specified number of days.
     * Updates both runtime plant instances and chunk persistent data.
     * 
     * @param {number} daysToAdvance - Number of days to advance (default: 1)
     */
    ageAllPlants(daysToAdvance = 1) {
        try {
            const chunkManager = this.scene?.exterior?.chunkManager;
            if (!chunkManager) {
                console.warn('PlantManager: ChunkManager not available, skipping plant aging');
                return;
            }

            const allChunks = chunkManager.getAllChunks();
            let plantsAged = 0;
            let chunksModified = 0;

            for (const chunk of allChunks) {
                if (!chunk.loaded) continue;

                // Age plants in chunk's persistent entity data
                const plants = chunk.getPlants();
                let plantsInThisChunk = 0;
                
                for (const plantEntity of plants) {
                    if (plantEntity.age_days === undefined) {
                        plantEntity.age_days = 0;
                    }
                    plantEntity.age_days += daysToAdvance;
                    plantsAged++;
                    plantsInThisChunk++;
                }

                // Mark chunk dirty so it persists on save
                if (plantsInThisChunk > 0) {
                    chunk.dirty = true;
                    chunksModified++;
                    if (this.scene.exterior.debug) {
                        console.log(`[PlantManager] Chunk ${chunk.key}: aged ${plantsInThisChunk} plants`);
                    }
                }
            }

            // Also age runtime Plant instances in the registry
            // Guard against potential unloaded/invalid registry entries
            Object.entries(this.registry.registry).forEach(([key, values]) => {
                if (values != null && Array.isArray(values)) {
                    values.forEach(plant => {
                        try {
                            if (plant && typeof plant.getStage === 'function') {
                                const oldDay = plant.day;
                                plant.day += daysToAdvance;
                                // Update the stage based on new age
                                plant.stage = plant.getStage();
                                if (this.scene.exterior.debug) {
                                    console.log(`[PlantManager] Runtime plant: ${plant.name} aged from ${oldDay} to ${plant.day}`);
                                }
                            }
                        } catch (e) {
                            // Skip this plant if there's an issue
                        }
                    });
                }
            });

            console.log(`PlantManager: Aged ${plantsAged} plants across ${chunksModified} chunks by ${daysToAdvance} day(s)`);
        } catch (e) {
            console.error('PlantManager.ageAllPlants() error:', e);
        }
    }

    /**
     * Debug: Print summary of all plant ages in chunks and registry.
     */
    debugPlantAges() {
        const chunkManager = this.scene?.exterior?.chunkManager;
        if (!chunkManager) {
            console.warn('ChunkManager not available');
            return;
        }

        console.log('=== CHUNK PLANT AGES ===');
        const allChunks = chunkManager.getAllChunks();
        for (const chunk of allChunks) {
            if (!chunk.loaded) continue;
            const plants = chunk.getPlants();
            if (plants.length > 0) {
                plants.forEach(entity => {
                    const age = entity.age_days ?? entity.params?.age_days ?? 0;
                    console.log(`  ${chunk.key}: ${entity.slug} at (${entity.localX},${entity.localY}) age=${age}d`);
                });
            }
        }

        console.log('=== REGISTRY PLANT AGES ===');
        Object.entries(this.registry.registry).forEach(([key, values]) => {
            if (values != null && values.length > 0) {
                values.forEach(plant => {
                    console.log(`  ${key}: ${plant.name} age=${plant.day}d stage=${plant.stage?.name ?? 'unknown'}`);
                });
            }
        });
    }

    setCollider() {
        var self = this;
        Object.entries(this.registry.registry).forEach(([key, values]) => {
            if (values != null && values.length > 0) {
                values.forEach(value => {
                    
                        value.setCollider();
                    
                });
            }
        });
        
    }

    trample () {
        console.log("trample");
    }

    

    newPlant (slug, days_old = 0) {
        return this.factory.newPlant(slug, days_old);
    }

    plantInfo (slug) {
        return this.factory.plantInfo(slug);
    }

    discardPlant (plant) {
        plant.destroy();
    }

    newPlantToWorld (_x,_y,slug,days_old=0) {
        var plant = this.newPlant(slug,days_old);
        var result = this.putPlantInWorld(plant,_x,_y);
        if (!result) {
            console.warn('Could not put this plant in the world from plant manager: '+slug);
            return false;
        }
        
        return plant;
    }

    putPlantInWorld (plant, _x, _y) {
        const added = this.registry.placePlant(plant,_x,_y);
        if (!added) return false;

        // Also register plant metadata in chunk storage when available
        try {
            const cm = this.scene?.exterior?.chunkManager;
            const worldSystem = this.scene?.exterior?.worldSystem || (typeof window !== 'undefined' ? window.WorldSystemInstance : null);
            if (cm) {
                const chunk = cm.getChunkAtTile(_x, _y);
                if (chunk) {
                    const local = chunk.worldToLocal(_x, _y);
                    if (local) {
                        const slug = plant?.info?.slug ?? plant?.name ?? 'UNKNOWN';
                        const existingPlants = (typeof chunk.getPlants === 'function') ? chunk.getPlants() : [];
                        const alreadyExists = Array.isArray(existingPlants) && existingPlants.some(entity => (
                            entity.localX === local.x && entity.localY === local.y && entity.slug === slug
                        ));
                        if (!alreadyExists) {
                            chunk.addPlant(slug, local.x, local.y, { age_days: plant.day });
                        }
                        if (worldSystem && typeof worldSystem.markDirty === 'function') {
                            try { worldSystem.markDirty(chunk); } catch (e) {}
                        } else {
                            try { chunk.dirty = true; } catch (e) {}
                        }
                    }
                }
            }
        } catch (e) {}

        return plant;
    }

    /**
     * Toggle debug labels on all loaded plants showing their age and stage.
     * For debugging plant progression. Call from console like:
     * scene.manager.plantManager.setDebugLabelsVisible(true)
     * 
     * @param {boolean} show - Whether to show labels (if undefined, toggles current state)
     */
    setDebugLabelsVisible(show = undefined) {
        try {
            let labelCount = 0;
            
            Object.entries(this.registry.registry).forEach(([key, values]) => {
                if (values != null && values.length > 0) {
                    values.forEach(plant => {
                        try {
                            if (show === undefined) {
                                // Toggle: show if not shown
                                const hasLabel = plant.debugLabel !== undefined;
                                if (hasLabel) {
                                    plant.debugLabel?.destroy();
                                    plant.debugLabel = undefined;
                                } else {
                                    if (typeof plant.setDebugLabel === 'function') {
                                        plant.setDebugLabel();
                                        labelCount++;
                                    }
                                }
                            } else if (show) {
                                if (typeof plant.setDebugLabel === 'function') {
                                    plant.setDebugLabel();
                                    labelCount++;
                                }
                            } else {
                                plant.debugLabel?.destroy();
                                plant.debugLabel = undefined;
                            }
                        } catch (e) {
                            console.warn('Error setting debug label for plant:', e);
                        }
                    });
                }
            });
            
            if (show !== false) {
                console.log(`PlantManager: Debug labels shown for ${labelCount} plants`);
            } else {
                console.log(`PlantManager: Debug labels hidden`);
            }
        } catch (e) {
            console.error('PlantManager.setDebugLabelsVisible() error:', e);
        }
    }

}