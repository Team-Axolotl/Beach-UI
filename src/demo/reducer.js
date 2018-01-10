import { fromJS } from 'immutable';

const defaultState = fromJS({
    hellos: 0
});

export const Types = {
    HELLOWORLD: Symbol('HELLO_WORLD'),
    REST_TEST: Symbol('REST_TEST')
};

export default function main(state = defaultState, action) {
    switch (action.type) {
        case Types.HELLOWORLD:
            state = state.set('hellos', state.get('hellos') + 1);
            return state;
    }

    return state;
}
