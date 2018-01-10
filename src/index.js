import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import dreamStore from '_dream/dreamStore.js';

// Load material ui setup.
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { pink, deepPurple, grey } from 'material-ui/colors';

// Load page components.
import LoginPage from './Login/LoginPage';
import HomePage from './Home/HomePage';
import SearchPage from './Search/SearchPage';

import Authentificator from 'User/Authentificator';

const theme = createMuiTheme({
    palette: {
        primary: pink,
        secondary: deepPurple,
        textColor: grey
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={theme} >
        <Provider store={dreamStore}>
            <BrowserRouter>
                <Switch>
                    <Authentificator>
                        <Route exact path='/' component={HomePage} />
                        <Route exact path='/home' component={HomePage} />
                        <Route exact path='/login' component={LoginPage} />
                        <Route exact path='/search' component={SearchPage} />
                    </Authentificator>
                </Switch>
            </BrowserRouter>
        </Provider>
    </MuiThemeProvider>, document.getElementById('root'));
