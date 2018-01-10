import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'material-ui';

// A grid column.
export default class Col extends React.PureComponent {
    render() {
        return (
            <Grid item {...this.props}>
                {this.props.children}
            </Grid>
        );
    }
}

Col.propTypes = {
    children: PropTypes.node
};
