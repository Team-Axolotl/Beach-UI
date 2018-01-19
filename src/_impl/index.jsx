import React from 'react';

import Standard from '_standard';
import { Router, Route, Redirect, browserHistory } from 'react-router';

// Pages
import Beach from '_impl/pages/Beach';
import Home from '_impl/pages/Home';

// Helpers
import NavigationBar from '_impl/components/Navigation/NavigationBar';
import Helper from '_impl/components/PageHelper';
import Permission from '_standard/components/Permission';
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
                                    <Route path='/createUser' component={() => <Permission isRoute check='user.user.create'>
                                                                                    <LazyLoaderComponent componentName={'createUser'} />
                                                                                </Permission>} />
                                    <Route path='/listUsers' component={() => <Permission isRoute check='user.user.fetch'>
                                                                                    <LazyLoaderComponent componentName={'listUsers'} />
                                                                                </Permission>} />
                                    <Route path='/home' component={Home} />
                                </Route>
                            </Route>
                            <Route path='/login' component={() => <LazyLoaderComponent componentName={'login'} />} />
                            <Redirect from='/' to='/login' />
                        </Route>
                    </Router>
                </StyleProvider>
            </Standard>
        );
    }
};
