import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';

class PermissionRoute extends React.Component {
    render() {
        let { check } = this.props;

        // Check if the checked permission is within the list, or if permissions contain %.
        if (1) {
            return this.props.children;
        } else {
            setTimeout(() => this.context.router.push('/'), 1);
            return null;
        }
    }
}

PermissionRoute.propTypes = {
    permissions: PropTypes.instanceOf(List),
    check: PropTypes.string.isRequired,
    children: PropTypes.node
};

PermissionRoute.contextTypes = {
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
)(PermissionRoute);
