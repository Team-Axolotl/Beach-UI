import {
    INIT_NAVIGATION,
    ADD_TAB,
    REMOVE_TAB,
    SET_ACTIVE_TAB,
    EDIT_TAB
} from './actionTypes';

export const initNavigation = ({ id, validateOnTabChange, items = [], activeTabUrl }) => ({
    type: INIT_NAVIGATION,
    id,
    validateOnTabChange,
    items,
    activeTabUrl
});

export const addTab = ({ navigationId, tab }) => ({
    type: ADD_TAB,
    navigationId,
    tab
});

export const removeTab = ({ navigationId, url }) => ({
    type: REMOVE_TAB,
    navigationId,
    url
});

export const setActiveTab = ({ navigationId, url = '', errors = {} }) => ({
    type: SET_ACTIVE_TAB,
    navigationId,
    url,
    errors
});

export const editTab = ({ navigationId, url, title }) => ({
    type: EDIT_TAB,
    navigationId,
    url,
    title
});