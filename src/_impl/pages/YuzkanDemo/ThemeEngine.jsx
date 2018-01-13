import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ThemeEngine extends React.Component {
    render() {
        return (
            this.props.children
        );
    }
}

ThemeEngine.propTypes = {
    children: PropTypes.node
};

export default connect(
    (state, props) => {
        return {

        };
    },
    {

    }
)(ThemeEngine);
