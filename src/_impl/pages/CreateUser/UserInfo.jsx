import React from 'react';
import PropTypes from 'prop-types';

import Row from '_dream/containers/Row';
import Col from '_dream/containers/Col';
import StandardInput from '_standard/components/StandardInput';
import Translate from '_standard/components/Translate';

import style from 'style.css';

export default class CustomerInfo extends React.Component {
    render() {
        return (
            <div style={{ borderTop: '1px solid #CCCCCC', padding: '10px' }}>
                <Row className={style.padRow} justify='center'>
                        <Row className={style.padRow} justify='center'>
                            <Col md={5} xs={12} sm={10}>
                                <Translate>{'Username'}</Translate>
                                <StandardInput onChange={this.props.applyInput} data={'userName'} value={this.props.inputs['userName'] || ''} translateLabel error={this.props.errors['userName'] || ''} />
                            </Col>
                        </Row>
                        <Row className={style.padRow} justify='center'>
                            <Col md={5} xs={12} sm={10}>
                                <Translate>{'Password'}</Translate>
                                <StandardInput onChange={this.props.applyInput} type='password' data={'password'} value={this.props.inputs['password'] || ''} translateLabel error={this.props.errors['password'] || ''} />
                            </Col>
                        </Row>
                </Row>
            </div>
        );
    }
}

CustomerInfo.propTypes = {
    applyInput: PropTypes.func.isRequired,
    inputs: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
