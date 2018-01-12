import { combineReducers } from 'redux';

import User from '_impl/logic/User/userReducer';
import Customer from '_impl/logic/Customer/customerReducer';
import { utUser } from '_impl/pages/User/reducer';

// Add your reducers here.
export default combineReducers({
    User,
    Customer,
    utUser
});
