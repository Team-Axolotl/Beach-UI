import React from 'react';
import PropTypes from 'prop-types';

import Row from '_dream/containers/Row';
import Col from '_dream/containers/Col';
import StandardInput from '_standard/components/StandardInput';
import Translate from '_standard/components/Translate';

import style from 'style.css';

export default class PhoneInfo extends React.Component {
    render() {
        return (
            <div style={{ borderTop: '1px solid #CCCCCC', padding: '10px' }}>
                <Row className={style.padRow} justify='center'>
                    <Row className={style.padRow} justify='center'>
                        <Col md={5} xs={12} sm={10}>
                            <Translate>{'Phone Number'}</Translate>
                            <StandardInput fullWidth onChange={this.props.applyInput} data={'phoneNumber'} value={this.props.inputs['phoneNumber'] || ''} translateLabel error={this.props.errors['phoneNumber'] || ''} />
                        </Col>
                    </Row>
                </Row>
            </div>
        );
    }
}

PhoneInfo.propTypes = {
    applyInput: PropTypes.func.isRequired,
    inputs: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
