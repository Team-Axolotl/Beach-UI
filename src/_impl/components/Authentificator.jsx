import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, IndexRoute, Redirect } from 'react-router';

import { CheckLogin } from '_impl/logic/User/actions';

import { getCookie, deleteCookies } from '_dream/helpers';

class Authentificator extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        // If not authentificated, not loading, and not currently on the login screen - go to the login screen. Is run once.
        if (!this.props.authentificated && !this.state.loading && this.context.router.location.pathname !== '/login') {
            this.context.router.push('/login');
        }
    }

    componentWillReceiveProps(nextProps) {
        // If not authentificated, and not currently on the login screen - go to the login screen. Is run every re-render.
        if (!nextProps.authentificated && this.context.router.location.pathname !== '/login') {
            this.context.router.push('/login');
        }
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

                // In case of an error go to login.
                this.context.router.push('/login');

                // Stop loading.
                this.setState({ loading: false });
            });
        } else {
            this.state.loading = false;
        }
    }

    render() {
        // Check if loading.
        if (this.state.loading) {
            return <div>Loading...</div>;
        }

        if (this.props.authentificated || this.context.router.location.pathname === '/login') {
            return (
                this.props.children
            );
        } else {
            return (
                null
            );
        }
    }
}

Authentificator.contextTypes = {
    router: PropTypes.object
};

Authentificator.propTypes = {
    children: PropTypes.node,
    authentificated: PropTypes.string,
    CheckLogin: PropTypes.func
};

export default connect(
    (state, props) => {
        return {
            authentificated: 1
        };
    },
    {
        CheckLogin
    }
)(Authentificator);
