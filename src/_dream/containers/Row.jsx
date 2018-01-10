import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'material-ui';

// A grid row.
export default class Row extends React.PureComponent {
    render() {
        return (
            <Grid container {...this.props} spacing={this.props.spacing}>
                {this.props.children}
            </Grid>
        );
    }
}

Row.propTypes = {
    children: PropTypes.node,
    spacing: PropTypes.number
};

Row.defaultProps = {
    spacing: 0
};
