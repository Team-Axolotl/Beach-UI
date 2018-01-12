import PropTypes from 'prop-types';

export const propTypes = {
    active: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string,
        url: PropTypes.string
    }).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string,
        url: PropTypes.string
    })).isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf(['tab', 'inlinePill', 'pill']),
    activeIndex: PropTypes.number,
    animated: PropTypes.bool,
    errors: PropTypes.object,
    onClick: PropTypes.func,
    onClose: PropTypes.func
};

export const defaultProps = {
    active: {},
    items: [],
    className: '',
    type: 'tab',
    activeIndex: 0,
    animated: false,
    errors: {},
    onClick: () => {},
    onClose: () => {}
};