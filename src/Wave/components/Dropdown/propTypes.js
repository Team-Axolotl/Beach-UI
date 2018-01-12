import PropTypes from 'prop-types';

export const propTypes = {
    inputKey: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        label: PropTypes.string
    })).isRequired,
    placeholder: PropTypes.string,
    clearable: PropTypes.bool,
    searchable: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired
};

export const defaultProps = {
    placeholder: 'Select an option...',
    clearable: true,
    searchable: true,
    disabled: false
};