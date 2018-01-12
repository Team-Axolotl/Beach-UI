import { fromJS, List } from 'immutable';

const createActionTypes = (name) => ({
    'FETCH': Symbol(`${name}_FETCH`)
});

const createActions = (actionTypes, method) => ({
    fetch: (params = {}) => ({
        type: actionTypes.FETCH,
        method: method,
        result: params
    })
});

const DEFAULT_STATE = new List();// 'key' : item
const DEFAULT_ITEM_GETTER = (action) => action.result || [];

const _mergeLists = (l1, l2, sorter) => {
    const out = [];
    // base case
    if (!l1.size) {
        return l2;
    }
    if (!l2.size) {
        return l1;
    }

    for (let i1 = 0, i2 = 0; i1 < l1.size || i2 < l2.size;) {
        if (i1 >= l1.size) {
            out.push(l2.get(i2++));
            continue;
        } else if (i2 >= l2.size) {
            out.push(l1.get(i1++));
            continue;
        }

        const item1 = l1.get(i1);
        const item2 = l2.get(i2);
        const result = sorter(item1, item2);
        if (result === 0) {
            out.push(l2.get(i2++));
            i1++;
        } else if (result < 0) {
            out.push(l1.get(i1++));
        } else {
            out.push(l2.get(i2++));
        }
    }
    return new List(out);
};

export const createReducer = (actionTypes, options) => {
    const { stable, itemGetter = DEFAULT_ITEM_GETTER } = options;

    const isStable = !!stable;
    let stableKeyCached;
    let sorter;
    if (Array.isArray(stable)) {
        stableKeyCached = stable;
    } else if (typeof stable === 'string' || stable instanceof String) {
        stableKeyCached = [stable];
    } // else we either have to search for it, or it is not stable
    // console.log(stableKeyCached, stable instanceof String, typeof stable)
    const createIntSorter = (keyPath) => (i1, i2) => 0 + i1.getIn(stableKeyCached) - i2.getIn(stableKeyCached);
    const createStringSorter = (keyPath) => (i1, i2) => String.prototype.localeCompare.call(i1.getIn(stableKeyCached, ''), i2.getIn(stableKeyCached, ''));

    const cacheKeyIfNeeded = (items) => {
        if (isStable && !stableKeyCached) {
            const firstItem = items.get(0);
            if (firstItem) {
                firstItem.some((value, key) => {
                    // Key is string and contains the 'id' in its name
                    const hasId = (key instanceof String) && key.toLowerCase().includes('id');
                    return hasId && (stableKeyCached = key);
                });
            }
        }
        if (!sorter) {
            sorter = (items.getIn([0, ...stableKeyCached]) instanceof String) ? createStringSorter(stableKeyCached) : createIntSorter(stableKeyCached);
        }
    };

    return (state = DEFAULT_STATE, action) => {
        switch (action.type) {
            case actionTypes.FETCH:
                var newItems = fromJS(itemGetter(action));
                return newItems;
                // cacheKeyIfNeeded(newItems);
                // if (isStable) {
                //     newItems = sorter ? newItems.sort(sorter) : newItems;
                // }
                // return _mergeLists(state, newItems, sorter);
            default:
                return state;
        }
    };
};

/**
 * Create a new fetcher object
 * @param {Object} options - See below
 * @param {string} options.name - The identifier to user for this fetcher
 * @param {string} options.method - The backend method (e.g 'user.user.fetch')
 * @param {string|array} options.stable - The key within the fetched data to user as identifier
 * @param {function} options.itemGetter - Transformation function which will be invoked on the result (result) => array of items
 */
export default function fetcher(options) {
    const { method, name } = options;

    const symName = name.toUpperCase();
    const actionTypes = createActionTypes(symName);
    const actions = createActions(actionTypes, method);
    const reducer = createReducer(actionTypes, options);
    return {
        actions,
        actionTypes,
        reducer
    };
}
