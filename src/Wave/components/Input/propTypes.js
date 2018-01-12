import PropTypes from 'prop-types';

export const propTypes = {
    inputKey: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    sideNote: PropTypes.string,
    placeholder: PropTypes.string,
    rightButtonClassname: PropTypes.string,
    disabled: PropTypes.bool,
    isRequired: PropTypes.bool,
    borderBottom: PropTypes.bool,
    rightButton: PropTypes.node,
    canClear: PropTypes.bool,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onClear: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onButtonClick: PropTypes.func,
    onEnterPress: PropTypes.func
};

export const defaultProps = {
    type: 'text',
    label: '',
    error: '',
    sideNote: '',
    placeholder: '',
    rightButtonClassname: '',
    disabled: false,
    isRequired: false,
    borderBottom: false,
    rightButton: null,
    canClear: false,
    readOnly: false,
    onClear: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onButtonClick: () => {},
    onEnterPress: () => {}
};
