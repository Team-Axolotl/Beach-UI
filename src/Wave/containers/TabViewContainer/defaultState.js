import { fromJS } from 'immutable';

export const defaultNavigationData = fromJS({
    tabs: [],
    activeTab: {},
    activeTabIndex: 0,
    validateOnTabChange: false
});

export default fromJS({});