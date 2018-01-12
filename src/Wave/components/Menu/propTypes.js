import PropTypes from 'prop-types';

export const defaultProps = {
    targetWidth: true,
    fixedWidth: null,
    closeOnSelect: true,
    position: 'bottom-left',
    selectedId: '',
    additionalOffsets: {},
    items: [],
    leftIcon: null,
    rightIcon: null,
    onItemSelect: () => {}
};
export const propTypes = {
    open: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
        label: PropTypes.string.isRequired,
        params: PropTypes.object
    })).isRequired,
    target: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
        PropTypes.string
    ]).isRequired,
    position: PropTypes.oneOf([
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'right-top',
        'left-top',
        'bottom-center',
        'top-center'
    ]),
    targetWidth: PropTypes.bool,
    fixedWidth: PropTypes.number,
    closeOnSelect: PropTypes.bool,
    selectedId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    additionalOffsets: PropTypes.object,
    leftIcon: PropTypes.shape({
        className: PropTypes.string.isRequired,
        glyph: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }),
    rightIcon: PropTypes.shape({
        className: PropTypes.string.isRequired,
        glyph: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }),
    onRequestClose: PropTypes.func.isRequired,
    onItemSelect: PropTypes.func
};

export const menuItemPropTypes = {
    selected: PropTypes.bool.isRequired,
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    label: PropTypes.string.isRequired,
    leftIcon: PropTypes.shape({
        className: PropTypes.string.isRequired,
        glyph: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }),
    rightIcon: PropTypes.shape({
        className: PropTypes.string.isRequired,
        glyph: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }),
    onItemClick: PropTypes.func
};
export const menuItemDefaultProps = {
    leftIcon: null,
    rightIcon: null,
    onItemClick: () => {}
};
