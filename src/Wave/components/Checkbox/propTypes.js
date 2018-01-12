import PropTypes from 'prop-types';

export const propTypes = {
    className: PropTypes.string,
    labelClassName: PropTypes.string,
    label: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onClick: PropTypes.func
};

export const defaultProps = {
    className: '',
    labelClassName: '',
    label: '',
    checked: false,
    disabled: false,
    value: '',
    onClick: () => {}
};