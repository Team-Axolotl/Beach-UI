import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Translate extends React.Component {
    render() {
        let translated = this.props.children;

        return translated || null;
    }
}

Translate.propTypes = {
    translations: PropTypes.object,
    children: PropTypes.node,
    // If set to true the component will not return blurred text when translations haven't loaded. This is useful when you want to guarantee the output is always a string.
    noBlur: PropTypes.bool
};

Translate.defaultProps = {
    noBlur: false
};

export default connect(
    (state, props) => {
        return {
            translations: state.Core.get('translations', null)
        };
    },
    {

    }
)(Translate);
