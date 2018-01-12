import PropTypes from 'prop-types';

export const propTypes = {
    className: PropTypes.string,
    left: PropTypes.number,
    children: PropTypes.array
};

export const defaultProps = {
    className: '',
    left: 0,
    children: []
};