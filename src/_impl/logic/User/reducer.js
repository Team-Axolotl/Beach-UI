import { fromJS, List } from 'immutable';

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
                let loginData = action.response.get('result', {});

                // Format permissions.
                let permissions = loginData.get('permission.get', new List());
                let formattedPermissions = [];
                permissions.map((value, index) => value.get('actionId') ? formattedPermissions.push(value.get('actionId')) : null);
                loginData = loginData.set('permission.get', fromJS(formattedPermissions));

                return state.set('login', fromJS(loginData));
            }
            break;
        case Types.LOGOUT:
            return state.set('login', fromJS({}));
    }

    return state;
}
