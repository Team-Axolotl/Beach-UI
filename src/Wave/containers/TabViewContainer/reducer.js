import { fromJS } from 'immutable';
import { find } from 'lodash';
import model, { defaultNavigationData } from './defaultState';
import {
    INIT_NAVIGATION,
    ADD_TAB,
    REMOVE_TAB,
    SET_ACTIVE_TAB,
    EDIT_TAB
} from './actionTypes';

const navigation = (state = model, action) => {
    switch (action.type) {
        case INIT_NAVIGATION:
            const activeTab = find(action.items, ({ url: action.activeTabUrl })) || action.items[0];
            state = state.set(action.id, defaultNavigationData);

            if (action.items.length) {
                state = state.setIn([action.id, 'tabs'], fromJS(action.items));
                state = state.setIn([action.id, 'activeTab'], fromJS(activeTab));
            }
            state = state.setIn([action.id, 'validateOnTabChange'], action.validateOnTabChange);
            return state;
        case ADD_TAB:
            const newTab = fromJS(action.tab);
            const newTabIndex = state.getIn([action.navigationId, 'tabs']).findIndex(i => i.get('url') === action.tab.url);

            if (!state.get(action.navigationId)) {
                state = state.set(action.navigationId, defaultNavigationData);
            }

            if (newTabIndex === -1) {
                state = state.updateIn([action.navigationId, 'tabs'], tabs => tabs.concat([newTab]));
            }

            state = state.setIn([action.navigationId, 'activeTab'], newTab);

            const newIndex = state.getIn([action.navigationId, 'tabs']).findIndex(i => i.get('url') === newTab.get('url'));
            state = state.setIn([action.navigationId, 'activeTabIndex'], newIndex);

            return state;
        case REMOVE_TAB:
            const activeNavigation = action.navigationId;
            let tabs = state.getIn([activeNavigation, 'tabs']);
            const currentActiveTab = state.getIn([activeNavigation, 'activeTab']);
            let currentActiveTabIndex = state.getIn([activeNavigation, 'activeTabIndex']);

            tabs = tabs.filter(tab => tab.get('url') !== action.url);
            state = state.setIn([activeNavigation, 'tabs'], tabs);

            if (action.url === currentActiveTab.get('url')) {
                currentActiveTabIndex = currentActiveTabIndex - 1 < 0 ? currentActiveTabIndex + 1 : currentActiveTabIndex - 1;  
            } else {
                currentActiveTabIndex = tabs.findIndex(i => i.get('url') === currentActiveTab.get('url'));
            }

            state = state.setIn([activeNavigation, 'activeTab'], tabs.get(currentActiveTabIndex))
            state = state.setIn([activeNavigation, 'activeTabIndex'], currentActiveTabIndex);

            return state;
        case SET_ACTIVE_TAB:
            const newActiveTab = state.getIn([action.navigationId, 'tabs']).find(i => i.get('url') === action.url);
            if (newActiveTab) {
                const newActiveIndex = state.getIn([action.navigationId, 'tabs']).findIndex(i => i.get('url') === newActiveTab.get('url'));
                const validateOnTabChange = state.getIn([action.navigationId, 'validateOnTabChange']);
                const prevTab = state.getIn([action.navigationId, 'tabs', newActiveIndex - 1]);
                const errors = prevTab && action.errors[prevTab.get('id')];

                if (validateOnTabChange && errors && errors.length) {
                    return state;
                }

                state = state.setIn([action.navigationId, 'activeTab'], newActiveTab);
                state = state.setIn([action.navigationId, 'activeTabIndex'], newActiveIndex);
            }

            return state;
        case EDIT_TAB:
            const index = state.getIn([action.navigationId, 'tabs']).findIndex(i => i.get('url') === action.url);
            let tab = state.getIn([action.navigationId, 'tabs']).find(i => i.get('url') === action.url);

            tab = tab.set('title', action.title);
            state = state.setIn([action.navigationId, 'tabs', index], tab);
            return state;
        default:
            return state;
    }
};

export default navigation;
