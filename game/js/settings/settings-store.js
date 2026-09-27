/*
 * Bridges the shipped defaults in SETTINGSCONFIG with the user's persisted
 * overrides. The shipped file holds DEFAULT (and INPUT.AVAILABLE) only; CUSTOM
 * is synthesized at boot so new defaults always reach existing players.
 */

const CACHE_KEY = 'SETTINGSCONFIG';

function getBridge() {
    return (typeof window !== 'undefined' && window.api) ? window.api : null;
}

export function getConfig(scene) {
    return scene.cache.json.get(CACHE_KEY);
}

/* Rebuilds CUSTOM for every category as DEFAULT overlaid with saved overrides. */
export function applyOverrides(config, overrides = {}) {
    if (!config) {
        return config;
    }

    for (const category of Object.keys(config)) {
        const defaults = config[category] && config[category].DEFAULT;
        if (!defaults) {
            continue;
        }

        const saved = overrides[category] || {};
        const custom = {};

        for (const key of Object.keys(defaults)) {
            custom[key] = Object.prototype.hasOwnProperty.call(saved, key) ? saved[key] : defaults[key];
        }

        config[category].CUSTOM = custom;
    }

    return config;
}

/* Sparse diff of CUSTOM against DEFAULT, so untouched settings stay unpersisted. */
export function collectOverrides(config) {
    const overrides = {};

    if (!config) {
        return overrides;
    }

    for (const category of Object.keys(config)) {
        const defaults = config[category] && config[category].DEFAULT;
        const custom = config[category] && config[category].CUSTOM;

        if (!defaults || !custom) {
            continue;
        }

        const changed = {};
        for (const key of Object.keys(defaults)) {
            if (Object.prototype.hasOwnProperty.call(custom, key) && custom[key] !== defaults[key]) {
                changed[key] = custom[key];
            }
        }

        if (Object.keys(changed).length > 0) {
            overrides[category] = changed;
        }
    }

    return overrides;
}

export async function loadSettings(scene) {
    const config = getConfig(scene);
    const bridge = getBridge();

    if (!bridge) {
        return applyOverrides(config, {});
    }

    try {
        const result = await bridge.invoke('load-settings');
        if (result && result.ok) {
            return applyOverrides(config, result.data);
        }
        console.warn('Could not load settings, using defaults:', result);
    } catch (error) {
        console.warn('Could not load settings, using defaults:', error);
    }

    return applyOverrides(config, {});
}

export async function saveSettings(scene) {
    const overrides = collectOverrides(getConfig(scene));
    const bridge = getBridge();

    if (!bridge) {
        return { ok: false, reason: 'no-bridge', data: overrides };
    }

    try {
        return await bridge.invoke('save-settings', { overrides });
    } catch (error) {
        console.error('Could not save settings:', error);
        return { ok: false, reason: 'invoke-failed', message: error && error.message };
    }
}

export function getSetting(scene, type, key) {
    const config = getConfig(scene);
    const category = config && config[type.toUpperCase()];

    if (!category) {
        return undefined;
    }

    if (category.CUSTOM && Object.prototype.hasOwnProperty.call(category.CUSTOM, key)) {
        return category.CUSTOM[key];
    }

    return category.DEFAULT ? category.DEFAULT[key] : undefined;
}

/* Audio settings are stored 0-10; Phaser wants 0-1. */
export function getVolume(scene, channel = 'FX') {
    const level = getSetting(scene, 'AUDIO', channel);
    if (!Number.isFinite(level)) {
        return 1;
    }
    return Math.min(1, Math.max(0, level / 10));
}
