import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';

class Permission extends React.Component {
    render() {
        // Check if the checked permission is within the list, or if permissions contain %.
        if (this.props.permissions.indexOf('%') !== -1 || this.props.permissions.indexOf(this.props.check) !== -1) {
            return this.props.children;
        } else {
            if (this.props.isRoute) setTimeout(() => this.context.router.push('/'), 1);
            return null;
        }
    }
}

Permission.propTypes = {
    permissions: PropTypes.instanceOf(List),
    check: PropTypes.string.isRequired,
    children: PropTypes.node,
    isRoute: PropTypes.bool
};

Permission.contextTypes = {
    router: PropTypes.object
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
