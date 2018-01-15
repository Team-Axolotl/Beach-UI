import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from '_dream/containers/Row';
import Col from '_dream/containers/Col';
import StandardDropdown from '_standard/components/StandardDropdown';

import style from 'style.css';

class Form extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row className={style.padRow} justify='center'>
                <Col md={5}>
                    <StandardDropdown>
                        <div>{'aaaa'}</div>
                        <div>{'bbbb'}</div>
                    </StandardDropdown>
                </Col>
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
