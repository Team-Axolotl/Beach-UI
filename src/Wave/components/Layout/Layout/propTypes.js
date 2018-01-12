import PropTypes from 'prop-types';

export const propTypes = {
    children: PropTypes.node,
    mainTabSet: PropTypes.shape({
        id: PropTypes.string,
        items: PropTypes.array,
        validate: PropTypes.bool,
        animated: PropTypes.bool
    })
};

export const defaultProps = {
    children: null,
    mainTabSet: null
};