import React from 'react';

import Standard from '_standard';
import { Route, Redirect } from 'react-router';

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
import Authentificator from '_impl/components/Authentificator';

export default class Impl extends React.PureComponent {
    render() {
        return (
            <Standard>
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
            </Standard>
        );
    }
};
