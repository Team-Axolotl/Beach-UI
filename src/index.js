import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Link, Redirect, browserHistory } from 'react-router';
import dreamStore from '_dream/dreamStore.js';

// Load material ui setup.
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { pink, deepPurple, grey } from 'material-ui/colors';
import 'normalize.css';
import './style.css';
import 'react-virtualized/styles.css';

import Authentificator from '_impl/components/Authentificator';

// Pages
import StandardDemo from '_impl/pages/StandardDemo';
import Beach from '_impl/pages/Beach';
import YuzkanLogin from '_impl/pages/YuzkanDemo/LoginPage';
import YuzkanForm from '_impl/pages/YuzkanDemo/Form/index';

import NavigationBar from '_impl/components/Navigation/NavigationBar';

const theme = createMuiTheme({
    palette: {
        primary: pink,
        secondary: grey,
        textColor: grey
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={theme} >
        <Provider store={dreamStore}>
            <Router history={browserHistory}>
                <Route path='/beach' component={Beach} />
                <Route path='/standard-demo' component={StandardDemo} />
                <Route component={Authentificator}>
                    <Route component={NavigationBar}>
                        <Route path='/home' component={YuzkanForm} />
                    </Route>
                    <Route path='/login' component={YuzkanLogin} />
                    <Redirect from='/' to='/login' />
                </Route>
            </Router>
        </Provider>
    </MuiThemeProvider>, document.getElementById('root'));
