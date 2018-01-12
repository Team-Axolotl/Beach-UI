import { fromJS } from 'immutable';

import { createReducer } from '../../components/Table/helpers/fetcher';
import * as actionTypes from './actionTypes';

export const userFetcher = createReducer({
    FETCH: actionTypes.FETCH_USERS
}, {
    itemGetter: (action) => {
        const next = fromJS(action.response.get('result', {})).get('user');
        console.log(next.toJS());
        return next;
    },
    stable: 'actorId'
});