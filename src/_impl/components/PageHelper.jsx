import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTranslations } from '_impl/logic/Core/actions';

class Helper extends React.Component {
    componentWillMount() {
        if (!this.props.translations) this.props.getTranslations();
    }

    render() {
        return this.props.children;
    }
}

Helper.propTypes = {
    children: PropTypes.node,
    getTranslations: PropTypes.func,
    translations: PropTypes.object
};

export default connect(
    (state, props) => {
        return {
            translations: state.Core.get('translations', null)
        };
    },
    {
        getTranslations
    }
)(Helper);
