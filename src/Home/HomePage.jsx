import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from '_dream/containers/Row';
import Col from '_dream/containers/Col';
import LogoutButton from './LogoutButton';

import { Logout } from 'User/actions';

class HomePage extends React.Component {
    render() {
        return (
            <Row justify='center'>
                <Col md={12}>
                    <LogoutButton />
                </Col>
            </Row>
        );
    }
}

HomePage.propTypes = {
    Logout: PropTypes.func
};

HomePage.contextTypes = {
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
)(HomePage);
