import { combineReducers } from 'redux';

import User from '_impl/logic/User/reducer';
import Customer from '_impl/logic/Customer/reducer';
import Core from '_impl/logic/Core/reducer';
import { utUser } from '_impl/pages/User/reducer';

// Add your reducers here.
export default combineReducers({
    User,
    Customer,
    Core,
    utUser
});
