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
        return (
            <StyledItem disableRipple disabled={this.context.router.history.location.pathname === this.props.link} onClick={() => this.props.onClick(this.props.link)}>
                {this.props.children}
            </StyledItem>
        );
    }
}

NavigationLink.propTypes = {
    link: PropTypes.string,
    children: PropTypes.string,
    onClick: PropTypes.func
};

NavigationLink.contextTypes = {
    router: PropTypes.object
};
