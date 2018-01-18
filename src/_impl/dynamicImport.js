const cache = {
    listUsers: null,
    createUser: null,
    'standard-demo': null
}

export function getModule(name) {
    return new Promise((resolve, reject) => {
        if (typeof name !== 'string' || name.length < 1) {
            reject('Bad params in setModule function');
        }

        const result = cache[name];

        if (!result) {
            // if module was not in the cache, trying to download it
            return dynamicImport(name).then((component) => {
                const Component = component.default;
                setModule(name, Component);

                resolve(Component);
            }).catch(err => reject(err));
        }

        resolve(result);
    })
};

export function setModule(name, component) {
    if (typeof name !== 'string' || name.length < 1 || typeof component !== 'function') {
        throw new Error('Bad params in setModule function');
    }

    cache[name] = component;
};

export function dynamicImport(moduleName) {
    switch (moduleName) {
        case 'listUsers':
            return import('split-listUsers');
        case 'createUser':
            return import('split-createUser');
        case 'standard-demo':
            return import('split-standard-demo');
        default:
            return null;
    };
}
