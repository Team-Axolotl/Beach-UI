import PropTypes from 'prop-types';

export const defaultProps = {};
export const propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        header: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node
        ]).isRequired,
        content: PropTypes.func
    })).isRequired
};