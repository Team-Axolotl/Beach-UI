const cache = {
    listUsers: null,
    createUser: null,
    'standard-demo': null
};

export function getModule(name) {
    return new Promise((resolve, reject) => {
        if (typeof name !== 'string' || name.length < 1) {
            reject(new Error('Bad params in setModule function'));
        }

        const result = cache[name];

        if (!result) {
            // if module was not in the cache, trying to download it
            return dynamicImport(name).then((component) => {
                const Component = component.default;
                setModule(name, Component);

                resolve(Component);

                return false;
            }).catch(err => reject(err));
        }

        resolve(result);
    });
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
            return import('_impl/pages/UserList.jsx');
        case 'createUser':
            return import('_impl/pages/CreateUser');
        case 'standard-demo':
            return import('_impl/pages/StandardDemo');
        case 'login':
            return import('_impl/pages/Login');
        default:
            return null;
    }
};
