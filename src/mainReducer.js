import { combineReducers } from 'redux';

import User from 'User/userReducer';
import Customer from 'Customer/customerReducer';
import { utUser } from './pages/User/reducer';

// Add your reducers here.
export default combineReducers({
    User,
    Customer,
    utUser
});
