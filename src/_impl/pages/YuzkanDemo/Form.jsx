import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Form extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScreenCenterContainer wrap='nowrap' alignItems='baseline'>

            </ScreenCenterContainer>
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
