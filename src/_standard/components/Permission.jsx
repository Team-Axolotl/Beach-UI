import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';

class Permission extends React.Component {
    render() {
        // Check if the checked permission is within the list, or if permissions contain %.
        if (1) {
            return this.props.children;
        } else {
            return null;
        }
    }
}

Permission.propTypes = {
    permissions: PropTypes.instanceOf(List),
    check: PropTypes.string.isRequired,
    children: PropTypes.node
};

export default connect(
    (state, props) => {
        return {
            permissions: state.User.getIn(['login', 'permission.get'], new List())
        };
    },
    {

    }
)(Permission);
