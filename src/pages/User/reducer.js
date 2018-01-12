import { fromJS } from 'immutable';

import * as actionTypes from './actionTypes';
import { userFetcher } from './userFetcher';

const DEFAULT_STATE = fromJS({
    users: [],
    pagination: {
        pagesTotal: 0,
        pageSize: 25,
        pageNumber: 1,
        recordsTotal: 0
    }
});

function utUser(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case actionTypes.FETCH_USERS:
            if (action.state === 'finished') {
                return state
                    .update('users', users => userFetcher(users, action))
                    .update('pagination', pagination => action.response.getIn(['result', 'pagination', 0], pagination));
            }
            break;
    }
    return state;
}

export { utUser };