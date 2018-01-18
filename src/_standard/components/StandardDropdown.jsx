import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Select from 'material-ui/Select';
import Input from 'material-ui/Input';
import Typography from 'material-ui/Typography';

import { Default, ErrorStyle } from '_standard/styles/Dropdown';
import { FormControl } from 'material-ui/Form';

import Translate from '_standard/components/Translate';

export default class StandardDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.calculateStyle = this.calculateStyle.bind(this);

        this.calculateStyle(props);
    }

    calculateStyle(propObject) {
        let { styleType, customStyle, error } = propObject;

        let styleTypeParsed = styleType;

        if (error) styleTypeParsed = 'error';

        let typesSwitch = {
            'default': Default,
            'error': ErrorStyle,
            'custom': customStyle
        };

        this.StyledDropdown = withStyles(typesSwitch[styleTypeParsed].select)(Select);
        this.StyledInput = withStyles(typesSwitch[styleTypeParsed].input)(Input);
        this.StyledFormControl = withStyles(typesSwitch[styleTypeParsed].formControl)(FormControl);
        this.StyledLabel = withStyles(typesSwitch[styleTypeParsed].label)(Typography);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.styleType !== this.props.styleType || nextProps.error !== this.props.error) {
            this.calculateStyle(nextProps);
        }
    }

    render() {
        let { styleType, customStyle, name, labelProps, translateLabel, error, label, disableUnderline, ...other } = this.props;

        let labelNode;
        // Check if translating errors.
        if (translateLabel) {
            labelNode = (<Translate>
                {error || label}
            </Translate>);
        } else {
            labelNode = error || label;
        }

        return (
            <this.StyledFormControl>
                <this.StyledDropdown {...other} input={<this.StyledInput disableUnderline={disableUnderline} id={name} name={name} />} >
                    {this.props.children}
                </this.StyledDropdown>
                <this.StyledLabel {...labelProps}>
                    {labelNode}
                </this.StyledLabel>
            </this.StyledFormControl>
        );
    }
}

StandardDropdown.propTypes = {
    // The name of the dropdown. Required for getting the name inside an onClick event.
    name: PropTypes.string.isRequired,
    // The styling type.
    styleType: PropTypes.string.isRequired,
    // If the styling type is custom - the style as per material format.
    customStyle: PropTypes.object,
    // The nodes to display inside the button. Can be a collection, string, anything...
    children: PropTypes.node.isRequired,
    // Whether to hide the underline of the dropdown input.
    disableUnderline: PropTypes.bool,
    // Error text to display under the dropdown, overrides the label.
    error: PropTypes.string,
    // The label to display under the dropdown.
    label: PropTypes.string,
    // Props for the label Typography object.
    labelProps: PropTypes.object,
    // Whether to translate labels.
    translateLabel: PropTypes.bool
};

StandardDropdown.defaultProps = {
    styleType: 'default',
    value: '',
    name: 'Untitled_' + Math.random(),
    disableUnderline: true
};
