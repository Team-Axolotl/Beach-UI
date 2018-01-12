import * as actionTypes from './actionTypes';

export const fetchUsers = (props) => ({
    type: actionTypes.FETCH_USERS,
    request: 'rpc/user.user.fetch',
    body: {
        method: 'user.user.fetch',
        params: {
            'pageSize': (props && props.pageSize) || 25,
            'pageNumber': (props && props.pageNumber) || 1,
            'breadcrumbs': [],
            'userType': 'Staff',
            'customSearch': {
                'field': 'userName',
                'value': ''
            }
        }
    }
});
