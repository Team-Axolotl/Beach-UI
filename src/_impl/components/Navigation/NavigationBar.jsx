import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteCookies } from '_dream/helpers';

import Row from '_dream/containers/Row';
import Fader from '_dream/containers/FadeContainer';
import NavigationLink from './NavigationLink';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuIcon from 'material-ui-icons/Menu';
import { CircularProgress } from 'material-ui';
import Typography from 'material-ui/Typography';

import { Logout } from '_impl/logic/User/actions';

import Translate from '_standard/components/Translate';
import Permission from '_standard/components/Permission';
import StandardButton from '_standard/components/StandardButton';
import { setModule, dynamicImport } from '_standard/dynamicImport';

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
            menuButtonHandle: null,
            loading: false
        };

        this.menuOpened = this.menuOpened.bind(this);
        this.menuClose = this.menuClose.bind(this);
        this.navigateToPage = this.navigateToPage.bind(this);
        this.logout = this.logout.bind(this);
    }

    menuOpened(e) {
        this.setState({
            menuButtonHandle: e.currentTarget
        });
    }

    menuClose(e) {
        return this.setState({
            menuButtonHandle: null
        });
    }

    async navigateToPage(page) {
        // first char is / and need to be removed
        const dynamicImportName = page.slice(1);
        await this.setState({loading: true});
        await this.menuClose();
        const component = await dynamicImport(dynamicImportName);
        if (component) {
            const Component = component.default;
            setModule(dynamicImportName, Component);
        }

        await this.setState({loading: false});
        this.context.router.push(page);
    }

    logout() {
        this.props.Logout().then(() => {
            deleteCookies();
            this.context.router.push('/login');
            return false;
        }).catch(() => {
            this.context.router.push('/login');
        });
    }

    render() {
        return (<div>
            <AppBar position='static' color='accent'>
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
                            <NavigationLink link={'/home'} onClick={this.navigateToPage}>
                                <Translate>
                                    {'Home'}
                                </Translate>
                            </NavigationLink>
                            <Permission check='user.user.fetch'>
                                <NavigationLink link={'/listUsers'} onClick={this.navigateToPage}>
                                    <Translate>
                                        {'Users'}
                                    </Translate>
                                </NavigationLink>
                            </Permission>
                            <Permission check='user.user.create'>
                                <NavigationLink link={'/createUser'} onClick={this.navigateToPage}>
                                    <Translate>
                                        {'Create User'}
                                    </Translate>
                                </NavigationLink>
                            </Permission>
                            <NavigationLink link={'/standard-demo'} onClick={this.navigateToPage}>
                                <Translate>
                                    {'StandardDemo'}
                                </Translate>
                            </NavigationLink>
                        </StyledMenu>
                        <Typography type='subheading' color='inherit'>
                            <Translate>{'Hello'}</Translate>{' '}{this.props.userName}
                        </Typography>
                    </Row>
                    <Row justify='flex-end'>
                        <StandardButton onClick={this.logout}>
                            <Translate>
                                {'Logout'}
                            </Translate>
                        </StandardButton>
                    </Row>
                </Toolbar>
            </AppBar>
            {!this.state.loading && this.props.children}
            <Fader visible={this.state.loading}>
                <CircularProgress size={100} thickness={3} style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    margin: 'auto'
                }} />
            </Fader>
        </div>
        );
    }
}

NavigationBar.propTypes = {
    userName: PropTypes.string,
    children: PropTypes.node,
    Logout: PropTypes.func
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
