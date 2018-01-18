import React from 'react';

import Standard from '_standard';
import { Router, Route, Redirect, browserHistory } from 'react-router';

// Pages
import Beach from '_impl/pages/Beach';
import Home from '_impl/pages/Home';
import Login from '_impl/pages/Login';

// Helpers
import NavigationBar from '_impl/components/Navigation/NavigationBar';
import Helper from '_impl/components/PageHelper';
import PermissionRoute from '_standard/components/PermissionRoute';
import Authentificator from '_impl/components/Authentificator';
import LazyLoaderComponent from '_standard/components/LazyLoaderComponent';
import StyleProvider from '_impl/components/StyleProvider/StyleProvider';

export default class Impl extends React.PureComponent {
    render() {
        return (
            <Standard>
                <StyleProvider>
                    <Router history={browserHistory}>
                        <Route path='/beach' component={Beach} />
                        <Route component={Authentificator}>
                            <Route component={Helper}>
                                <Route component={NavigationBar}>
                                    <Route path='/standard-demo' component={() => <LazyLoaderComponent componentName={'standard-demo'} />} />
                                    <Route path='/createUser' component={() => <PermissionRoute check='user.user.create'>
                                                                                    <LazyLoaderComponent componentName={'createUser'} />
                                                                                </PermissionRoute>} />
                                    <Route path='/listUsers' component={() => <PermissionRoute check='user.user.fetch'>
                                                                                    <LazyLoaderComponent componentName={'listUsers'} />
                                                                                </PermissionRoute>} />
                                    <Route path='/home' component={Home} />
                                </Route>
                            </Route>
                            <Route path='/login' component={Login} />
                            <Redirect from='/' to='/login' />
                        </Route>
                    </Router>
                </StyleProvider>
            </Standard>
        );
    }
};
