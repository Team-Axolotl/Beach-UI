import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import { Button } from 'material-ui';

import { Logout } from '_impl/logic/User/actions';
import { deleteCookies } from '_dream/helpers';

const styles = {
    root: {
        borderRadius: 3,
        border: '1px solid white',
        color: 'white',
        padding: '0 30px'
    },
    label: {
        textTransform: 'capitalize'
    }
};

const StyledButton = withStyles(styles)(Button);

class LogoutButton extends React.Component {
    render() {
        return (
            <StyledButton
              disableRipple
              classes={this.props.classes}
              color='contrast'
              onClick={() => {
                    this.props.Logout().then(() => {
                        deleteCookies();
                        this.context.router.history.push('/login');
                        return false;
                    }).catch(() => { this.context.router.history.push('/login'); });
                }}
            >
                {'Logout'}
            </StyledButton>
        );
    }
}

LogoutButton.propTypes = {
    Logout: PropTypes.func,
    classes: PropTypes.object
};

LogoutButton.contextTypes = {
    router: PropTypes.object
};

export default connect(
    (state, props) => {
        return {

        };
    },
    {
        Logout
    }
)(LogoutButton);
