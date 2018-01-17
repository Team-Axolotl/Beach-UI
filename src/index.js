import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import dreamStore from '_dream/dreamStore.js';

// Load material ui setup.
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { grey, blue } from 'material-ui/colors';
import 'normalize.css';
import './style.css';
import 'react-virtualized/styles.css';

import Authentificator from '_impl/components/Authentificator';

// Pages
import StandardDemo from '_impl/pages/StandardDemo';
import Beach from '_impl/pages/Beach';
import Home from '_impl/pages/Home';
import Login from '_impl/pages/Login';
import CreateUser from '_impl/pages/CreateUser';
import UserList from '_impl/pages/UserList';

// Helpers
import NavigationBar from '_impl/components/Navigation/NavigationBar';
import Helper from '_impl/components/PageHelper';
import PermissionRoute from '_standard/components/PermissionRoute';

const standardBlue = {
    50: '#77aff3',
    100: '#77aff3',
    200: '#77aff3',
    300: '#77aff3',
    400: '#77aff3',
    500: '#77aff3',
    600: '#77aff3',
    700: '#77aff3',
    800: '#77aff3',
    900: '#77aff3',
    A100: '#77aff3',
    A200: '#77aff3',
    A400: '#77aff3',
    A700: '#77aff3',
    contrastDefaultColor: '#77aff3'
};

const theme = createMuiTheme({
    palette: {
        primary: grey,
        secondary: standardBlue,
        textColor: grey.contrastDefaultColor
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={theme} >
        <Provider store={dreamStore}>
            <Router history={browserHistory}>
                <Route path='/beach' component={Beach} />
                <Route component={Authentificator}>
                    <Route component={Helper}>
                        <Route component={NavigationBar}>
                        <Route path='/standard-demo' component={StandardDemo} />
                            <Route path='/createUser' component={() => <PermissionRoute check='user.user.create'><CreateUser /></PermissionRoute>} />
                            <Route path='/listUsers' component={() => <PermissionRoute check='user.user.fetch'><UserList /></PermissionRoute>} />
                            <Route path='/home' component={Home} />
                        </Route>
                    </Route>
                    <Route path='/login' component={Login} />
                    <Redirect from='/' to='/login' />
                </Route>
            </Router>
        </Provider>
    </MuiThemeProvider>, document.getElementById('root'));
