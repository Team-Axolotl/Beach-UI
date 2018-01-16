import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from '_dream/containers/Row';
import Col from '_dream/containers/Col';

import StandardTabs from '_standard/components/StandardTabs';
import StandardTab from '_standard/components/StandardTab';
import StandardButton from '_standard/components/StandardButton';

import CustomerInfo from './CustomerInfo';
import UserInfo from './UserInfo';
import PhoneInfo from './PhoneInfo';

import Translate from '_standard/components/Translate';

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputs: {},
            value: 0
        };

        this.applyInput = this.applyInput.bind(this);
        this.applyInputDropdown = this.applyInputDropdown.bind(this);
        this.tabChange = this.tabChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    applyInput(e) {
        this.state.inputs[e.target.parentElement.getAttribute('data')] = e.target.value;

        this.setState({
            inputs: this.state.inputs
        });
    }

    applyInputDropdown(e, c) {
        this.state.inputs[e.target.name] = e.target.value;

        this.setState({
            inputs: this.state.inputs
        });
    }

    submitForm() {

    }

    tabChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        let tabs = [
            <CustomerInfo applyInput={this.applyInput} applyInputDropdown={this.applyInputDropdown} inputs={this.state.inputs} />,
            <PhoneInfo applyInput={this.applyInput} applyInputDropdown={this.applyInputDropdown} inputs={this.state.inputs} />,
            <UserInfo applyInput={this.applyInput} applyInputDropdown={this.applyInputDropdown} inputs={this.state.inputs} />
        ];

        return (
            <div style={{ marginTop: '50px' }}>
                <Row justify='center'>
                    <Col md={8} sm={10} xs={12} style={{ border: '1px solid #CCCCCC' }}>
                        <StandardTabs value={this.state.value} onChange={this.tabChange} scrollable scrollButtons='auto'>
                            <StandardTab disableRipple label={<Translate>{'Customer Info'}</Translate>} />
                            <StandardTab disableRipple label={<Translate>{'Phone'}</Translate>} />
                            <StandardTab disableRipple label={<Translate>{'User Info'}</Translate>} />
                        </StandardTabs>
                        {tabs[this.state.value]}
                    </Col>
                    <Col md={8} sm={10} xs={12}>
                        <StandardButton style={{ width: '100%', borderRadius: 0 }} styleType='blue' onClick={this.submitForm}>
                            <Translate>{'Create'}</Translate>
                        </StandardButton>
                    </Col>
                </Row>
            </div>
        );
    }
}

Form.propTypes = {
    value: PropTypes.number
};

export default connect(
    (state, props) => {
        return {

        };
    },
    {

    }
)(Form);
