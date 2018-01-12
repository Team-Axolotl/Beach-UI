import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import style from 'style.css';
import logo from '_impl/assets/demoLogo.png';

import { Paper, CircularProgress } from 'material-ui';
import Fader from '_dream/containers/FadeContainer';
import Row from '_dream/containers/Row';
import Col from '_dream/containers/Col';
import ScreenCenterContainer from '_dream/containers/ScreenCenterContainer';
import Image from '_dream/components/Image';
import FormContainer from '_dream/containers/FormContainer';

import StandardInput from '_standard/components/StandardInput';
import StandardButton from '_standard/components/StandardButton';

import { Login } from '_impl/logic/User/actions.js';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loginError: '',
            loading: false
        };

        this.login = this.login.bind(this);
    }

    login() {
        if (this.state.password === '' || this.state.username === '') {
            this.setState({ loginError: 'Both fields are required.', loading: false });
            return;
        }

        this.props.Login(this.state.username, this.state.password).then((a) => {
            // Check error message for password switch.
            if (a.state === 'error' && a.response.get('message') !== 'Switch to password') {
                this.setState({ loginError: a.response.get('message'), loading: false });
            }

            if (a.state === 'finished') {
                this.context.router.history.push('/yuzkan-form');
            }

            return false;
        }).catch((x) => {
            this.setState({ loginError: x, loading: false });
        });

        this.setState({ loading: true });
    }

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
                        <FormContainer onEnter={this.login} style={Object.assign({ position: 'relative' }, this.props.style)} className={this.props.className}>
                            <Paper elevation={12} style={
                                {
                                    padding: '20px',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    filter: this.state.loading ? 'blur(3px) grayscale(100%)' : '',
                                    pointerEvents: this.state.loading ? 'none' : ''
                                }
                            }>
                                <Row className={style.padRow}>
                                    <Col xs={12}>
                                        <StandardInput
                                          autoFocus
                                          fullWidth
                                          error={this.state.loginError}
                                          onChange={(e) => this.setState({ username: e.target.value, passwordEnabled: false })}
                                          value={this.state.username}
                                          placeholder={'Username'} />
                                    </Col>
                                </Row>
                                <Row className={style.padRow}>
                                    <Col xs={12}>
                                        <StandardInput
                                          type='password'
                                          fullWidth
                                          onChange={(e) => this.setState({ password: e.target.value })}
                                          value={this.state.password}
                                          placeholder={'Password'} />
                                    </Col>
                                </Row>
                                <Row className={style.padRow}>
                                    <Col xs={12}>
                                        <StandardButton style={{ width: '100%' }} onClick={this.login}>
                                            {'Login'}
                                        </StandardButton>
                                    </Col>
                                </Row>
                            </Paper>
                            <Fader visible={this.state.loading}>
                                <CircularProgress size={100} thickness={3} color={'accent'} className={style.absoluteCenter} />
                            </Fader>
                        </FormContainer>
                    </Col>
                </Row>
            </ScreenCenterContainer>
        );
    }
}

LoginPage.propTypes = {
    Login: PropTypes.func
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
        Login
    }
)(LoginPage);
