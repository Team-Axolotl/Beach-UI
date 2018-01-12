import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from '_dream/containers/Row';
import LogoutButton from './LogoutButton';
import NavigationLink from './NavigationLink';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';

import { Logout } from 'User/actions';

const menuStyles = theme => ({
    paper: {
        width: '200px',
        padding: '5px'
    }
});

const StyledMenu = withStyles(menuStyles)(Menu);

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuButtonHandle: null
        };

        this.menuOpened = this.menuOpened.bind(this);
        this.menuClose = this.menuClose.bind(this);
        this.navigateToPage = this.navigateToPage.bind(this);
    }

    menuOpened(e) {
        this.setState({
            menuButtonHandle: e.currentTarget
        });
    }

    menuClose(e) {
        this.setState({
            menuButtonHandle: null
        });
    }

    navigateToPage(page) {
        this.context.router.history.push(page);
        this.menuClose();
    }

    render() {
        return (
            <AppBar position='static'>
                <Toolbar>
                    <Row justify='flex-start' alignItems='center'>
                        <IconButton color='contrast' aria-label='Menu' onClick={this.menuOpened}>
                            <MenuIcon />
                        </IconButton>
                        <StyledMenu
                          anchorEl={this.state.menuButtonHandle}
                          open={!!this.state.menuButtonHandle}
                          onClose={this.menuClose}
                          transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                          anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                        >
                            <NavigationLink link={'/home'} onClick={this.navigateToPage}>{'Home'}</NavigationLink>
                            <NavigationLink link={'/search'} onClick={this.navigateToPage}>{'Search'}</NavigationLink>
                            <NavigationLink link={'/standard-demo'} onClick={this.navigateToPage}>{'Standard Styling Demo'}</NavigationLink>
                        </StyledMenu>
                        <Typography type='subheading' color='inherit'>
                            {'Hello ' + this.props.userName}
                        </Typography>
                    </Row>

                    <Row justify='flex-end'>

                        <LogoutButton />
                    </Row>
                </Toolbar>
            </AppBar>
        );
    }
}

NavigationBar.propTypes = {
    userName: PropTypes.string
};

NavigationBar.contextTypes = {
    router: PropTypes.object
};

export default connect(
    (state, props) => {
        return {
            userName: state.User.getIn(['login', 'person', 'firstName']) + ' ' + state.User.getIn(['login', 'person', 'lastName'])
        };
    },
    {
        Logout
    }
)(NavigationBar);
