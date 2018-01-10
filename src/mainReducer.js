import { combineReducers } from 'redux';

import User from 'User/userReducer';
import Customer from 'Customer/customerReducer';

// Add your reducers here.
export default combineReducers({
    User,
    Customer
});
