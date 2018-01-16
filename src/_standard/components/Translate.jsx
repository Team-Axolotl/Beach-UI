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
            } else {
                // If it is, and they aren't loaded - blur the original text. (Could be anything really.)
                translated = (<span style={{ color: 'transparent', textShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>{translated}</span>);
            }
        }

        // If after translation the text is empty, like for instance a missing translation or other data corruption, display the original text.
        if (!translated) {
            translated = this.props.children;
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
