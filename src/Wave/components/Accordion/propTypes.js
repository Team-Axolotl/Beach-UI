import PropTypes from 'prop-types';

export const propTypes = {
    children: PropTypes.node.isRequired,
    accordionKey: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string,
    expanded: PropTypes.bool,
    onExpand: PropTypes.func,
    onCollapse: PropTypes.func
};

export const defaultProps = {
    accordionKey: '__default__',
    className: '',
    title: '',
    expanded: false,
    onExpand: () => {},
    onCollapse: () => {}
};