import PropTypes from 'prop-types';

export const propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
};

export const defaultProps = {
    className: '',
    onClick: () => {}
};