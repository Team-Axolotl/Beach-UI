import { fromJS } from 'immutable';

const defaultState = fromJS({
    searchResults: {}
});

export const Types = {
    SEARCH: Symbol('SEARCH')
};

export default function main(state = defaultState, action) {
    switch (action.type) {
        case Types.SEARCH:
            if (action.state === 'finished') {
                return state.set('searchResults', fromJS(action.response.get('result', {})));
            }
            break;
    }

    return state;
}
