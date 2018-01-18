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
    children: PropTypes.node
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
