import { Types } from './reducer';

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

export function createUser(firstName, lastName, gender, userName, password, phoneNumber) {
    return {
        type: Types.CREATE_USER,
        request: 'rpc/user.user.add',
        body: {
            method: 'user.user.add',
            params: {
                hash: [{
                    type: 'password',
                    value: password,
                    expireDate: 1515937876599,
                    identifier: userName,
                    isEnabled: true
                }],
                user: [{
                    isApproved: true,
                    primaryLanguageId: 1
                }],
                actorHierarchy: [{
                    predicate: 'memberOf',
                    object: '1003'
                }],
                roles: [],
                person: {
                    firstName,
                    lastName,
                    gender
                },
                email: [],
                phone: [{
                    phoneNumber,
                    phoneTypeId: 'personal',
                    statusId: 'active',
                    mnoId: '1',
                    isPrimary: true
                }],
                address: [],
                policyId: 2,
                externalUser: [],
                userToExternalUser: [],
                ldap: false
            }
        }
    };
}

export function fetchUsers() {
    return {
        type: Types.FETCH_USERS,
        request: 'rpc/user.user.fetch',
        body: {
            method: 'user.user.fetch',
            params: {
                'pageSize': 111111,
                'pageNumber': 1,
                'breadcrumbs': [],
                'userType': 'Staff',
                'customSearch': {
                    'field': 'userName',
                    'value': ''
                }
            }
        }
    };
};
