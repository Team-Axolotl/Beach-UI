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

        this.StyledDropdown = withStyles(typesSwitch[styleType])(Select);
    }

    render() {
        let { styleType, customStyle, name, placeholder, ...other } = this.props;

        return (
            <FormControl>
                {/* <InputLabel htmlFor={name}>{placeholder}</InputLabel> */}
                <this.StyledDropdown displayEmpty {...other} input={<Input id={name} name={name} />} >
                <option value=''>{'Select an option'}</option>
                    {this.props.children}
                </this.StyledDropdown>
            </FormControl>
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
