import PropTypes from 'prop-types';

export const propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node
        ]).isRequired,
        sidenote: PropTypes.string,
        rightNode: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node
        ]),
        itemGroup: PropTypes.string
    })).isRequired,
    listKey: PropTypes.string,
    className: PropTypes.string,
    searchable: PropTypes.bool,
    multiselect: PropTypes.bool,
    selectable: PropTypes.bool,
    nested: PropTypes.bool,
    selected: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])),
    onChange: PropTypes.func,
    onSearch: PropTypes.func
};

export const defaultProps = {
    listKey: '__default__',
    className: '',
    searchable: false,
    multiselect: false,
    selectable: false,
    nested: false,
    selected: [],
    onChange: () => {},
    onSearch: () => {}
};

export const listItemPropTypes = {
    checkable: PropTypes.bool,
    itemId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]).isRequired,
    sidenote: PropTypes.string,
    rightNode: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    selected: PropTypes.bool,
    selectable: PropTypes.bool,
    onSelect: PropTypes.func
};

export const listItemDefaultProps = {
    checkable: false,
    sidenote: '',
    rightNode: null,
    selected: false,
    selectable: false,
    onSelect: () => {}
};