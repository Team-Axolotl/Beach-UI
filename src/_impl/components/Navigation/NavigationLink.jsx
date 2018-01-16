import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';

const itemStyles = theme => ({
    root: {
        backgroundColor: 'white',
        color: 'black',
        '&:hover': {
            backgroundColor: theme.palette.primary['500'],
            color: 'white'
        }
    }
});

const StyledItem = withStyles(itemStyles)(MenuItem);

export default class NavigationLink extends React.Component {
    render() {
        let isCurrentPage = this.context.router.location.pathname === this.props.link;

        return (
            <StyledItem disableRipple disabled={isCurrentPage} onClick={isCurrentPage ? null : () => this.props.onClick(this.props.link)}>
                {isCurrentPage ? <span><span>{'> '}</span>{this.props.children}</span> : this.props.children}
            </StyledItem>
        );
    }
}

NavigationLink.propTypes = {
    link: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func
};

NavigationLink.contextTypes = {
    router: PropTypes.object
};
