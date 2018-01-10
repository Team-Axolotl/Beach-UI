/**
 * Checks whether the provided variable is an object.
 * @param item The variable to check.
 * @returns {boolean} Whether the variable is an object.
 */
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
   * Deep merge two objects.
   * @param target The object to merge into.
   * @param sources The objects to merge from.
   */
function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

const conf = mergeDeep({ }, require('./dreamConfigDefaults.json'), require('../configs/dreamConfig.js'));

module.exports = conf;
