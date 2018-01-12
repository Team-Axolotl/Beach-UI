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
import LoginPage from '_impl/pages/Login/LoginPage';
import HomePage from '_impl/pages/Home/HomePage';
import SearchPage from '_impl/pages/Search/SearchPage';
import Beach from '_impl/pages/Beach';
import LoginFormExample from '_impl/pages/Beach/LoginFormExample/';
import UserGrid from '_impl/pages/User/UserGrid';
import StandardDemo from '_impl/pages/StandardDemo';

// Yuzkan Demo Pages
import YuzkanLogin from '_impl/pages/YuzkanDemo/Login';
import YuzkanForm from '_impl/pages/YuzkanDemo/Form';

import Authentificator from '_impl/components/Authentificator';
import NavigationBar from '_impl/components/Navigation/NavigationBar';

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
                    <Route exact path='/yuzkan-login' component={YuzkanLogin} />
                    <Route exact path='/yuzkan-form' component={YuzkanForm} />
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
