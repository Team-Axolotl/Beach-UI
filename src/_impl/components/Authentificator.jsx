import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { Redirect } from 'react-router-dom';

import { CheckLogin } from '_impl/logic/User/actions';

import { getCookie, deleteCookies } from '_dream/helpers';

class Authentificator extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: false
        };
    }

    componentWillMount() {
        // Get the authentification cookie.
        let authenCookie = getCookie('xsrf-token');

        // Check if it exists, in which case we send a request.
        if (authenCookie) {
            // Load request.
            this.state.loading = true;

            // Check login if we have a cookie.
            this.props.CheckLogin().then((a) => {
                // Check if the request has errored.
                if (a.state === 'error') {
                    deleteCookies();
                }

                this.setState({ loading: false });
                return false;
            }).catch(() => {
                deleteCookies();
                // In case of error, user is not logged in.
                this.context.router.history.push('/login');
                // Stop loading.
                this.setState({ loading: false });
            });
        }
    }

    render() {
        // Check if loading.
        if (this.state.loading) {
            return <div>Loading...</div>;
        }

        let authentificated = this.props.login.getIn(['identity.check', 'sessionId']);
        let isLoginPage = this.context.router.history.location.pathname === '/login';

        // If authentificated don't show login.
        if (authentificated && isLoginPage) {
            // console.log('If authentificated don\'t show login.');
            return <Redirect to={'/home'} />;
            // If authentificated show page.
        } else if (authentificated && !isLoginPage) {
            // console.log('If authentificated show page.');
            return this.props.children;
            // If not authentificated redirect to login.
        } else if (!authentificated && !isLoginPage) {
            // console.log('If not authentificated redirect to login.');
            return <Redirect to={'/login'} />;
            // If not authentificated and on login, show it.
        } else if (!authentificated && isLoginPage) {
            // console.log('If not authentificated and on login, show it.');
            return this.props.children;
        }
    }
}

Authentificator.contextTypes = {
    router: PropTypes.object
};

Authentificator.propTypes = {
    children: PropTypes.node,
    login: PropTypes.instanceOf(Map),
    CheckLogin: PropTypes.func
};

export default connect(
    (state, props) => {
        return {
            login: state.User.get('login', new Map())
        };
    },
    {
        CheckLogin
    }
)(Authentificator);
