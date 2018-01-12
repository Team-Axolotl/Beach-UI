import PropTypes from 'prop-types';

export const propTypes = {
    type: PropTypes.oneOf([
        'default',
        'primaryLight',
        'primaryDark',
        'primaryBlue',
        'longButton',
        'primaryLong',
        'secondaryLong'
    ]).isRequired,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    role: PropTypes.oneOf(['button', 'reset', 'submit']),
    label: PropTypes.string,
    disabled: PropTypes.bool,
    disabledClassName: PropTypes.string,
    iconContainerClassName: PropTypes.string,
    iconClassName: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func
};

export const defaultProps = {
    className: '',
    role: 'button',
    label: '',
    disabled: false,
    disabledClassName: '',
    iconClassName: '',
    iconContainerClassName: '',
    href: '',
    icon: '',
    onClick: () => {}
};