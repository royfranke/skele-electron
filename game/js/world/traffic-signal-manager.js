/* TrafficSignalManager
 * Deterministic city-wide traffic signal cycle derived from scene real-time.
 * Simulation authority only; render systems should subscribe/query.
 */

export default class TrafficSignalManager {

    constructor(scene, config = {}) {
        this.scene = scene;

        this.timings = {
            light: config.light ?? 8000,
            warning: config.warning ?? 4000,
            yellow: config.yellow ?? 3000,
            allRed: config.allRed ?? 1000,
        };

        this.halfCycleMs = this.timings.light + this.timings.warning + this.timings.yellow + this.timings.allRed;
        this.totalCycleMs = this.halfCycleMs * 2;

        this.phaseId = null;
        this.listeners = new Set();
    }

    subscribe(listener) {
        if (typeof listener !== 'function') {
            return;
        }
        this.listeners.add(listener);
    }

    unsubscribe(listener) {
        this.listeners.delete(listener);
    }

    update() {
        const phase = this.getCurrentPhase();
        if (phase == null) {
            return;
        }

        if (this.phaseId === phase.id) {
            return;
        }

        this.phaseId = phase.id;
        this.listeners.forEach((listener) => {
            try {
                listener(phase);
            }
            catch (e) {}
        });
    }

    getIntersectionPhase(_intersectionId = '') {
        return this.getCurrentPhase();
    }

    getDirectionState(direction = 'EW') {
        const phase = this.getCurrentPhase();
        if (phase == null) {
            return null;
        }
        const dir = direction === 'NS' ? 'ns' : 'ew';
        return phase[dir];
    }

    shouldStopAtIntersection(_worldX, _worldY, approachDir = 'EW') {
        const state = this.getDirectionState(approachDir);
        if (state == null) {
            return false;
        }
        return state.vehicle !== 'GREEN';
    }

    getCurrentPhase() {
        const positionMs = this.getCyclePositionMs();

        if (positionMs < this.timings.light) {
            return {
                id: 'EW_GREEN',
                ew: { vehicle: 'GREEN', ped: 'SIGNAL_HAND_WALK' },
                ns: { vehicle: 'RED', ped: 'SIGNAL_HAND_WALK' },
            };
        }

        if (positionMs < this.timings.light + this.timings.warning) {
            return {
                id: 'EW_WARNING',
                ew: { vehicle: 'GREEN', ped: 'SIGNAL_HAND_WARNING' },
                ns: { vehicle: 'RED', ped: 'SIGNAL_HAND_WARNING' },
            };
        }

        if (positionMs < this.timings.light + this.timings.warning + this.timings.yellow) {
            return {
                id: 'EW_YELLOW',
                ew: { vehicle: 'YELLOW', ped: 'SIGNAL_HAND_WARNING' },
                ns: { vehicle: 'RED', ped: 'SIGNAL_HAND_WARNING' },
            };
        }

        if (positionMs < this.halfCycleMs) {
            return {
                id: 'ALL_RED_BEFORE_NS',
                ew: { vehicle: 'RED', ped: 'SIGNAL_HAND_WARNING' },
                ns: { vehicle: 'RED', ped: 'SIGNAL_HAND_WARNING' },
            };
        }

        const secondHalfPosition = positionMs - this.halfCycleMs;

        if (secondHalfPosition < this.timings.light) {
            return {
                id: 'NS_GREEN',
                ew: { vehicle: 'RED', ped: 'SIGNAL_WALK_HAND' },
                ns: { vehicle: 'GREEN', ped: 'SIGNAL_WALK_HAND' },
            };
        }

        if (secondHalfPosition < this.timings.light + this.timings.warning) {
            return {
                id: 'NS_WARNING',
                ew: { vehicle: 'RED', ped: 'SIGNAL_WARNING_HAND' },
                ns: { vehicle: 'GREEN', ped: 'SIGNAL_WARNING_HAND' },
            };
        }

        if (secondHalfPosition < this.timings.light + this.timings.warning + this.timings.yellow) {
            return {
                id: 'NS_YELLOW',
                ew: { vehicle: 'RED', ped: 'SIGNAL_WARNING_HAND' },
                ns: { vehicle: 'YELLOW', ped: 'SIGNAL_WARNING_HAND' },
            };
        }

        return {
            id: 'ALL_RED_BEFORE_EW',
            ew: { vehicle: 'RED', ped: 'SIGNAL_WARNING_HAND' },
            ns: { vehicle: 'RED', ped: 'SIGNAL_WARNING_HAND' },
        };
    }

    getCyclePositionMs() {
        const elapsedMs = this.getElapsedRealTimeMs();
        if (this.totalCycleMs <= 0) {
            return 0;
        }
        return ((elapsedMs % this.totalCycleMs) + this.totalCycleMs) % this.totalCycleMs;
    }

    getElapsedRealTimeMs() {
        const sceneNow = this.scene?.time?.now;
        if (typeof sceneNow === 'number' && Number.isFinite(sceneNow)) {
            return Math.floor(sceneNow);
        }
        return Date.now();
    }
}