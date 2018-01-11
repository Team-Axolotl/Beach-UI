import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import style from 'style.css';

import { Button, TextField, Paper, CircularProgress } from 'material-ui';
import Row from '_dream/containers/Row';
import Col from '_dream/containers/Col';
import FormContainer from '_dream/containers/FormContainer';
import Fader from '_dream/containers/FadeContainer';

import { Login } from 'User/actions.js';

class LoginForm extends React.Component {
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
                this.context.router.history.push('/home');
            }

            return false;
        }).catch((x) => {
            this.setState({ loginError: x, loading: false });
        });

        this.setState({ loading: true });
    }

    render() {
        return (
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
                            <TextField autoFocus fullWidth error={!!this.state.loginError}
                                label={this.state.loginError}
                                onChange={(e) => this.setState({ username: e.target.value, passwordEnabled: false })}
                                value={this.state.username}
                                placeholder={'Username'} />
                        </Col>
                    </Row>
                    <Row className={style.padRow}>
                        <Col xs={12}>
                            <TextField type='password' fullWidth onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} placeholder={'Password'} />
                        </Col>
                    </Row>
                    <Row className={style.padRow}>
                        <Col xs={12}>
                            <Button disableRipple style={{ width: '100%' }} raised color='primary' onClick={this.login}>
                                {'Login'}
                            </Button>
                        </Col>
                    </Row>
                </Paper>
                <Fader visible={this.state.loading}>
                    <CircularProgress size={100} thickness={3} className={style.absoluteCenter} />
                </Fader>
            </FormContainer>
        );
    }
}

LoginForm.propTypes = {
    // Style inheritance.
    style: PropTypes.object,
    className: PropTypes.string,
    // Actions
    Login: PropTypes.func
};

LoginForm.contextTypes = {
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
)(LoginForm);
