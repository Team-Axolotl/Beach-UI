import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Translate extends React.Component {
    render() {
        let translated = this.props.children;

        // Check if the child is a string.
        if (typeof translated === 'string') {
            if (this.props.translations) {
                // If it is, and translations are loaded - translate it.
                translated = this.props.translations[translated.toLowerCase().trim()];
            } else if (!this.props.noBlur) {
                // If it is, and they aren't loaded - blur the original text. (Could be anything really.)
                translated = (<span style={{ color: 'transparent', textShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>{translated}</span>);
            } else {
                translated = '*~*~*~*';
            }
        }

        // If after translation the text is empty, like for instance a missing translation or other data corruption, display the original text.
        if (!translated) {
            translated = this.props.children;
        }

        // If it stil is empty, render null.
        if (!translated) {
            return null;
        }

        return translated;
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
