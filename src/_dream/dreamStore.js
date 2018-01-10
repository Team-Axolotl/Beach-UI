import thunk from 'redux-thunk';
import XHR from 'xhr-promise';
import { fromJS } from 'immutable';
import { applyMiddleware, createStore } from 'redux';

import { getCookie } from 'helpers.js';
import dreamConfig from 'system/config.js';
import mainReducer from 'mainReducer.js';

const requestSendingMiddleware = (store) => (next) => (action) => {
    // Check if the action which has been sent wants to go to the backend.
    if (action.request) {
        // Send an action with a request state of sent.
        action.state = 'sent';
        next(action);

        // Get the body.
        let body = Object.assign({}, action.body);

        // Setup headers from defaults.
        let headers = dreamConfig.Frontend.REST.DefaultHeaders;

        // Check if attaching an auth cookie.
        if (dreamConfig.Frontend.REST.AuthentificationCookie.Name && dreamConfig.Frontend.REST.AuthentificationCookie.HeaderName) {
            // Get the authentification cookie if it exists.
            let authentificationCookie = getCookie(dreamConfig.Frontend.REST.AuthentificationCookie.Name);
            if (authentificationCookie) {
            // Add it to the headers.
                headers[dreamConfig.Frontend.REST.AuthentificationCookie.HeaderName] = authentificationCookie;
            }
        }

        // Prepare the request and send it.
        let request = new XHR();
        let requestPromise = request.send(Object.assign(dreamConfig.Frontend.REST.Options, {
            method: action.requestType || 'POST',
            url: dreamConfig.Frontend.REST.Root + action.request,
            headers,
            data: JSON.stringify(Object.assign({}, dreamConfig.Frontend.REST.DefaultBody, body))
        }));

        // Return the request promise.
        return requestPromise.then((response) => {
            if (response && response.responseText) {
                // Check for an error key.
                if (response.responseText.error) {
                    // Throw an error in that case.
                    action.state = 'error';
                    action.response = fromJS(response.responseText.error);
                } else {
                    // Set the response and leave.
                    action.state = 'finished';
                    action.response = fromJS(response.responseText);
                }
            } else {
                // If for some reason the response is empty pass an empty object.
                action.state = 'finished';
                action.response = fromJS({});
            }

            next(action);
            return action;
        }).catch((error) => {
            action.state = 'error';

            // Check if response is empty, and generate an empty map.
            if (!action.response) {
                if (error.hasOwnProperty('status') && error.status === 0) { // Check for no connection error.
                    action.response = fromJS({message: 'No connection.'});
                } else if (error.reason) { // If the error has a reason, set it under the message.
                    action.response = fromJS({message: error.reason});
                } else { // Else set the whole error object to the response.
                    action.response = fromJS({error});
                }
            }

            next(action);
            return action;
        });
    } else {
        // Normal actions should return promises as well.
        return new Promise((resolve, reject) => {
            next(action);
            resolve();
        });
    }
};

// Enable devTools if in dev mode.
var devTools = window.devToolsExtension && dreamConfig.Frontend.DevMode ? window.devToolsExtension({
    serialize: true,
    actionSanitizer: (action) => {
        // Adding Symbol functionality to the dev tools.
        if (typeof action.type === 'symbol') {
            let actionCopy = Object.assign({}, action);
            actionCopy.type = action.type.toString();
            return actionCopy;
        }
        return action;
    }
}) : f => f;

// Create the Redux store with the dream middleware and dev tools if enabled.
var store = createStore(mainReducer, devTools, applyMiddleware(thunk, requestSendingMiddleware));

export default store;
