import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Translate extends React.Component {
    render() {
        let translated = this.props.children;

        if (this.props.translations) {
            if (typeof translated === 'string') {
                translated = this.props.translations[translated.toLowerCase().trim()];
            } else if (translated.length > 0 && typeof translated[0] === 'string') {
                translated = this.props.translations[translated.toLowerCase().trim()];
            }
        } else {
            translated = (<span style={{ color: 'transparent', textShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>{translated}</span>);
        }

        if (!translated) {
            translated = this.props.children;
        }

        return (
            <span>
                {translated}
            </span>
        );
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
