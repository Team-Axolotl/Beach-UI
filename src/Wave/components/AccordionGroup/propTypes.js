import PropTypes from 'prop-types';

export const propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired
    })).isRequired,
    expandedGroups: PropTypes.arrayOf(PropTypes.string),
    initialExpanded: PropTypes.string,
    singleExpandable: PropTypes.bool,
    className: PropTypes.string
};

export const defaultProps = {
    initialExpanded: '',
    singleExpandable: false,
    className: '',
    expandedGroups: []
};