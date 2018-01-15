import { fromJS } from 'immutable';

const defaultState = fromJS({
    login: {}
});

export const Types = {
    LOGIN: Symbol('LOGIN'),
    LOGOUT: Symbol('LOGOUT'),
    CREATE_USER: Symbol('CREATE_USER')
};

export default function main(state = defaultState, action) {
    switch (action.type) {
        case Types.LOGIN:
            if (action.state === 'finished') {
                return state.set('login', fromJS(action.response.get('result', {})));
            }
            break;
        case Types.LOGOUT:
            return state.set('login', fromJS({}));
    }

    return state;
}
