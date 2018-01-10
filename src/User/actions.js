import { Types } from './userReducer';

export function Login(username, password) {
    return {
        type: Types.LOGIN,
        request: 'login',
        body: {
            method: 'identity.check',
            params: {
                timezone: '+' + ((new Date().getTimezoneOffset() * -1) / 60),
                channel: 'web',
                username,
                password
            }
        }
    };
}

export function CheckLogin() {
    return {
        type: Types.LOGIN,
        request: 'rpc/identity.check',
        body: {
            method: 'identity.check',
            params: {
                channel: 'web'
            }
        }
    };
};

export function Logout() {
    return {
        type: Types.LOGOUT,
        request: 'rpc/identity.closeSession',
        body: {
            method: 'identity.closeSession',
            params: {}
        }
    };
};
