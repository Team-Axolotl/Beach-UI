import PropTypes from 'prop-types';

export const propTypes = {
    activeIndex: PropTypes.number,
    className: PropTypes.string,
    menu: PropTypes.shape({
        className: PropTypes.string,
        items: PropTypes.array,
        onClick: PropTypes.func,
        onClose: PropTypes.func
    }),
    children: PropTypes.array,
    bordered: PropTypes.bool,
    forceScroll: PropTypes.bool,
    border: PropTypes.string
};

export const defaultProps = {
    activeIndex: null,
    className: '',
    menu: null,
    children: [],
    bordered: false,
    forceScroll: false,
    border: ''
};