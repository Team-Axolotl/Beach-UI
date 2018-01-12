import PropTypes from 'prop-types';

export const propTypes = {
    inputKey: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    inputProps: PropTypes.object,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    borderBottom: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export const defaultProps = {
    inputProps: {},
    placeholder: '',
    label: '',
    borderBottom: false
};