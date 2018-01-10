import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const customStyles = theme => ({
    textFieldRoot: {
        padding: 0,
        'label + &': {
            marginTop: theme.spacing.unit * 3
        }
    },
    textFieldInput: {
        borderRadius: 4,
        border: '1px solid #ced4da',
        fontSize: 16,
        background: theme.palette.common.white,
        padding: '10px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderColor: theme.palette.primary['500'],
            boxShadow: '0 0 0 0.2rem ' + theme.palette.primary['A100'] + '87'
        }
    },
    textFieldFormLabel: {
        fontSize: 18
    }
});

// A material UI input field modified to be square.
class SquareInput extends React.PureComponent {
    render() {
        let {classes, ...other} = this.props;

        return (
            <TextField {...other} InputProps={{
                disableUnderline: true,
                classes: {
                    root: classes.textFieldRoot,
                    input: classes.textFieldInput
                }
            }}
            InputLabelProps={{
                shrink: true,
                className: classes.textFieldFormLabel
            }} />
        );
    }
}

SquareInput.propTypes = {
    classes: PropTypes.object
};

export default withStyles(customStyles)(SquareInput);
