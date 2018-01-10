import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from '_dream/containers/Row';
import Col from '_dream/containers/Col';

import { Button } from 'material-ui';

import { Logout } from 'User/actions';
import { deleteCookies } from '_dream/helpers';

class LogoutButton extends React.Component {
    render() {
        return (
            <Button raised color='primary' onClick={() => {
                this.props.Logout().then(() => {
                    deleteCookies();
                    this.context.router.history.push('/login');
                    return false;
                }).catch(() => { this.context.router.history.push('/login'); });
            }}>{'Logout'}</Button>
        );
    }
}

LogoutButton.propTypes = {
    Logout: PropTypes.func
};

LogoutButton.contextTypes = {
    router: PropTypes.object
};

export default connect(
    (state, props) => {
        return {

        };
    },
    {
        Logout
    }
)(LogoutButton);
