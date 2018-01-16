import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Problem from 'material-ui-icons/ReportProblem';

import Row from '_dream/containers/Row';
import Col from '_dream/containers/Col';

import StandardTabs from '_standard/components/StandardTabs';
import StandardTab from '_standard/components/StandardTab';
import StandardButton from '_standard/components/StandardButton';

import CustomerInfo from './CustomerInfo';
import UserInfo from './UserInfo';
import PhoneInfo from './PhoneInfo';

import Translate from '_standard/components/Translate';
import TranslateInline from '_standard/components/TranslateInline';

class CreateUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputs: {},
            tab: 0,
            validations: {},
            problematicTabs: [],
            errors: {}
        };

        this.state.validations = {
            firstName: {
                func: (value) => { return !/[0-9]/g.test(value) && !/\s/g.test(value) && value.length <= 10 && value.length >= 3; },
                reqs: 'Must be between 3 and 10 characters, and not contain spaces or numbers.',
                tab: 0
            },
            lastName: {
                func: (value) => { return !/[0-9]/g.test(value) && !/\s/g.test(value) && value.length <= 10 && value.length >= 3; },
                reqs: 'Must be between 3 and 10 characters, and not contain spaces or numbers.',
                tab: 0
            },
            phoneNumber: {
                func: (value) => { return !/[A-z]/g.test(value) && !/\s/g.test(value) && value.length === 10; },
                reqs: 'Must be exactly 10 numbers.',
                tab: 1
            },
            userName: {
                func: (value) => { return !/\s/g.test(value) && value.length <= 10 && value.length >= 3; },
                reqs: 'Must be between 3 and 10 characters, and not contain spaces.',
                tab: 2
            },
            password: {
                func: (value) => { return value.length <= 10 && value.length >= 3; },
                reqs: 'Must be between 3 and 10 characters.',
                tab: 2
            }
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
        // Validation
        let problematicTabs = [];
        let requiredFields = Object.keys(this.state.validations);
        let errors = {};
        for (let i = 0; i < requiredFields.length; i++) {
            let isValid = false;
            // Check if the field exists.
            if (this.state.inputs[requiredFields[i]]) {
                // Validate it using the internal function.
                isValid = this.state.validations[requiredFields[i]].func(this.state.inputs[requiredFields[i]]);
            } else {
                 // If the value is missing, mark it as an error.
                isValid = false;
            }
            if (!isValid) {
                // If the value is invalid, mark it.
                problematicTabs.push(this.state.validations[requiredFields[i]].tab || 0);
                errors[requiredFields[i]] = this.state.validations[requiredFields[i]].reqs;
            }
        }

        this.setState({ errors, problematicTabs });
    }

    tabChange = (event, tab) => {
        this.setState({ tab });
    };

    render() {
        let tabs = [
            <CustomerInfo applyInput={this.applyInput} applyInputDropdown={this.applyInputDropdown} inputs={this.state.inputs} errors={this.state.errors} />,
            <PhoneInfo applyInput={this.applyInput} applyInputDropdown={this.applyInputDropdown} inputs={this.state.inputs} errors={this.state.errors} />,
            <UserInfo applyInput={this.applyInput} applyInputDropdown={this.applyInputDropdown} inputs={this.state.inputs} errors={this.state.errors} />
        ];

        return (
            <div style={{ marginTop: '50px' }}>
                <Row justify='center'>
                    <Col md={8} sm={10} xs={12} style={{ border: '1px solid #CCCCCC' }}>
                        <StandardTabs value={this.state.tab} onChange={this.tabChange} scrollable scrollButtons='auto' textColor={'accent'}>
                            <StandardTab icon={this.state.problematicTabs.indexOf(0) === -1 ? null : <Problem />} disableRipple label={TranslateInline(this.props.translations, 'Customer')} />
                            <StandardTab icon={this.state.problematicTabs.indexOf(1) === -1 ? null : <Problem />} disableRipple label={TranslateInline(this.props.translations, 'Phone')} />
                            <StandardTab icon={this.state.problematicTabs.indexOf(2) === -1 ? null : <Problem />} disableRipple label={TranslateInline(this.props.translations, 'Login')} />
                        </StandardTabs>
                        {tabs[this.state.tab]}
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

CreateUser.propTypes = {
    translations: PropTypes.object
};

export default connect(
    (state, props) => {
        return {
            translations: state.Core.get('translations', null)
        };
    },
    {

    }
)(CreateUser);
