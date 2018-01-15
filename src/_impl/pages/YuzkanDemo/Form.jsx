import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from '_dream/containers/Row';
import Col from '_dream/containers/Col';
import StandardDropdown from '_standard/components/StandardDropdown';
import StandardInput from '_standard/components/StandardInput';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

import style from 'style.css';
import FormLabel from 'material-ui/Form/FormLabel';

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputs: {}
        };

        this.applyInput = this.applyInput.bind(this);
    }

    applyInput(e) {
        this.state.inputs[e.target.]
    }

    render() {
        return (
            <Row className={style.padRow} justify='center'>
                <FormControl>
                    <Row className={style.padRow} justify='center'>
                        <Col md={6}>
                            {'First Name *'}
                        </Col>
                        <Col md={6}>
                            <StandardInput onClick={this.applyInput} value={this.state['firstName']} data='firstName' />
                        </Col>
                    </Row>
                    <Col md={5}>


                        <StandardDropdown>
                            <div>{'aaaa'}</div>
                            <div>{'bbbb'}</div>
                        </StandardDropdown>
                    </Col>
                </FormControl>
            </Row>
        );
    }
}

Form.propTypes = {

};

export default connect(
    (state, props) => {
        return {

        };
    },
    {

    }
)(Form);
