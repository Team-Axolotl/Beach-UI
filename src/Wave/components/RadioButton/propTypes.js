import PropTypes from 'prop-types';

export const propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    selected: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
        text: PropTypes.string,
        className: PropTypes.string
    })]),
    onClick: PropTypes.func
};

export const defaultProps = {
    className: '',
    selected: false,
    label: '',
    disabled: false,
    onClick: () => {}
};