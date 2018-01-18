import React from 'react';
import PropTypes from 'prop-types';

import Row from '_dream/containers/Row';
import Col from '_dream/containers/Col';
import StandardDropdown from '_standard/components/StandardDropdown';
import StandardInput from '_standard/components/StandardInput';
import Translate from '_standard/components/Translate';

import { MenuItem } from 'material-ui/Menu';

import style from 'style.css';

export default class CustomerInfo extends React.Component {
    render() {
        return (
            <div style={{ borderTop: '1px solid #CCCCCC', padding: '10px' }}>
                <Row className={style.padRow} justify='center'>
                    <Row className={style.padRow} justify='center'>
                        <Col md={5} xs={12} sm={10}>
                            <Translate>{'First Name'}</Translate>
                            <StandardInput fullWidth onChange={this.props.applyInput} data={'firstName'} value={this.props.inputs['firstName'] || ''} translateLabel error={this.props.errors['firstName'] || ''} />
                        </Col>
                    </Row>
                    <Row className={style.padRow} justify='center'>
                        <Col md={5} xs={12} sm={10}>
                            <Translate>{'Last Name'}</Translate>
                            <StandardInput fullWidth onChange={this.props.applyInput} data={'lastName'} value={this.props.inputs['lastName'] || ''} translateLabel error={this.props.errors['lastName'] || ''} />
                        </Col>
                    </Row>
                    <Row className={style.padRow} justify='center'>
                        <Col md={5} xs={12} sm={10}>
                            <Translate>{'Sex'}</Translate>
                            <StandardDropdown onChange={this.props.applyInputDropdown} name={'gender'} translateLabel error={this.props.errors['gender'] || ''} value={this.props.inputs['gender']}>
                                    <MenuItem value='m'>{'Male'}</MenuItem>
                                    <MenuItem value='f'>{'Female'}</MenuItem>
                            </StandardDropdown>
                        </Col>
                    </Row>
                </Row>
            </div>
        );
    }
}

CustomerInfo.propTypes = {
    applyInput: PropTypes.func.isRequired,
    applyInputDropdown: PropTypes.func.isRequired,
    inputs: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
