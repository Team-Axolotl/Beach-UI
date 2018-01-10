/**
* Checks whether the provided variable is an object.
* @param item The variable to check.
* @returns {boolean} Whether the variable is an object.
*/
const isObject = (item) => {
    return (item && typeof item === 'object' && !Array.isArray(item));
};

/**
* Checks whether the provided variable is an object.
* @param item The variable to check.
* @returns {boolean} Whether the variable is an object.
*/
const mergeDeep = (target, ...sources) => {
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
};

module.exports = { isObject, mergeDeep };
