import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';

import { Default } from '_standard/styles/Dropdown';
import { FormControl } from 'material-ui/Form';

export default class StandardDropdown extends React.Component {
    constructor(props) {
        super(props);

        let { styleType, customStyle } = this.props;

        let typesSwitch = {
            'default': Default,
            'custom': customStyle
        };

        this.StyledDropdown = withStyles(typesSwitch[styleType].select)(Select);
        this.StyledInput = withStyles(typesSwitch[styleType].input)(Input);
        this.StyledFormControl = withStyles(typesSwitch[styleType].formControl)(FormControl);
        this.StyledInputLabel = withStyles(typesSwitch[styleType].inputLabel)(InputLabel);
    }

    render() {
        let { styleType, customStyle, name, placeholder, ...other } = this.props;

        return (
            <this.StyledFormControl>
                <this.StyledInputLabel htmlFor={name}>{placeholder}</this.StyledInputLabel>
                <this.StyledDropdown displayEmpty {...other} input={<this.StyledInput id={name} name={name} />} >
                    {this.props.children}
                </this.StyledDropdown>
            </this.StyledFormControl>
        );
    }
}

StandardDropdown.propTypes = {
    // The name of the dropdown.
    name: PropTypes.string.isRequired,
    // The text to display when no option is selected.
    placeholder: PropTypes.string.isRequired,
    // The styling type.
    styleType: PropTypes.string.isRequired,
    // If the styling type is custom - the style as per material format.
    customStyle: PropTypes.object,
    // The nodes to display inside the button. Can be a collection, string, anything...
    children: PropTypes.node.isRequired
};

StandardDropdown.defaultProps = {
    styleType: 'default',
    value: '',
    placeholder: 'Select an option.',
    name: 'Untitled_' + Math.random(),
    disableUnderline: true
};
