import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import dreamStore from '_dream/dreamStore.js';

// Load material ui setup.
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { pink, deepPurple, grey } from 'material-ui/colors';
import 'normalize.css';
import './style.css';
import 'react-virtualized/styles.css';

// Load page components.
import LoginPage from './Login/LoginPage';
import HomePage from './Home/HomePage';
import SearchPage from './Search/SearchPage';
import Beach from './Beach/';
import LoginFormExample from './Beach/LoginFormExample/';
import UserGrid from './pages/User/UserGrid';
import StandardDemo from 'StandardDemo';

import Authentificator from 'User/Authentificator';
import NavigationBar from 'Navigation/NavigationBar';

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
                    {/* Routes without authentification */}
                    <Route exact path='/beach' component={Beach} />
                    <Route exact path='/loginExample' component={LoginFormExample} />
                    <Route exact path='/standard-demo' component={StandardDemo} />
                    <Route exact path='/login' component={LoginPage} />
                    <Authentificator>
                        {/* Routes without navigation bar */}
                        <NavigationBar />
                        <Route exact path='/' component={HomePage} />
                        <Route exact path='/home' component={HomePage} />
                        <Route exact path='/search' component={SearchPage} />
                        <Route exact path='/users' component={UserGrid} />
                    </Authentificator>
                </Switch>
            </BrowserRouter>
        </Provider>
    </MuiThemeProvider>, document.getElementById('root'));
