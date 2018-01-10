import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import logo from './logo.png';

import Row from '_dream/containers/Row';
import Col from '_dream/containers/Col';
import ScreenCenterContainer from '_dream/containers/ScreenCenterContainer';
import Image from '_dream/components/Image';
import LoginForm from './LoginForm';

class LoginPage extends React.Component {
    render() {
        return (
            <ScreenCenterContainer wrap='nowrap' alignItems='baseline'>
                <Row justify='center' spacing={0} style={{ flexShrink: 0 }}>
                    <Col xs={12} md={12} >
                        <Image img={logo} size='25vh' maxSize='400px' />
                    </Col>
                </Row>
                <Row justify='center' spacing={0}>
                    <Col xs={11} sm={6} md={4}>
                        <LoginForm />
                    </Col>
                </Row>
            </ScreenCenterContainer>
        );
    }
}

LoginPage.propTypes = {

};

LoginPage.contextTypes = {
    router: PropTypes.object
};

export default connect(
    (state, props) => {
        return {

        };
    },
    {

    }
)(LoginPage);
