import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import style from 'style.css';

import Row from '_dream/containers/Row';
import Col from '_dream/containers/Col';
import FadeContainer from '_dream/containers/FadeContainer';
import ScreenCenterContainer from '_dream/containers/ScreenCenterContainer';

import { Button, TextField, Checkbox, Chip, FormControlLabel } from 'material-ui';

import { Hello, RestTest } from './actions.js';

class Demo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            restTestField: '',
            faderCheckbox: true,
            centeredonScreen: false
        };
    }

    render() {
        let demo = (
            <div>
                <Row className={style.padRow}>
                    <Col xs={12}>
                        <div className={style.textCenter}>
                            {'Hello World, I am Dream, nice to meet you ^-^'}
                        </div>
                    </Col>
                </Row>
                <Row className={style.padRow}>
                    <Col xs={12}>
                        <div className={style.textCenter}>
                            <Button disableRipple raised color='primary' onClick={() => this.props.Hello().then(() => window.alert('Hello!'))}>
                                {'Click me to initiate a redux action!'}
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row className={style.padRow}>
                    <Col xs={6} style={{textAlign: 'right', padding: '5px'}}>
                        <TextField onChange={(e) => this.setState({ restTestField: e.target.value })} value={this.state.restTestField} placeholder={'Rest Data'} />
                    </Col>
                    <Col xs={6}>
                        <Button disableRipple raised color='primary' onClick={() => this.props.RestTest(this.state.restTestField).then((x) => window.alert('REST Response: ' + JSON.stringify(x.response)))}>
                            {'Click me to send data to a REST API!'}
                        </Button>
                    </Col>
                </Row>
                <Row className={style.padRow}>
                    <Col xs={6} style={{textAlign: 'right'}}>
                        <FormControlLabel control={
                            <Checkbox disableRipple checked={this.state.faderCheckbox} onChange={(e) => this.setState({ faderCheckbox: e.target.checked })} />
                        } label='Text Visible' />
                    </Col>
                    <Col xs={6}>
                        <FadeContainer visible={this.state.faderCheckbox}>
                            <Chip label='Hello!' />
                        </FadeContainer>
                    </Col>
                </Row>
                <Row className={style.padRow}>
                    <Col xs={12}>
                        <div className={style.textCenter}>
                            <Button disableRipple raised color='primary' onClick={() => this.setState({ centeredonScreen: !this.state.centeredonScreen })}>
                                {'Center on Screen'}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );

        if (this.state.centeredonScreen) {
            demo = <ScreenCenterContainer>{demo}</ScreenCenterContainer>;
        }

        return demo;
    }
}

Demo.propTypes = {
    Hello: PropTypes.func,
    RestTest: PropTypes.func
};

export default connect(
    (state, props) => {
        return {

        };
    },
    {
        Hello, RestTest
    }
)(Demo);
