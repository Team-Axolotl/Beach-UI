import PropTypes from 'prop-types';

export const footerPropTypes = {
    className: PropTypes.string,
    actionButtons: PropTypes.array,
    leftNode: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.object])
};

export const footerDefaultProps = {
    className: '',
    actionButtons: [],
    leftNode: ''
};

export const headerPropTypes = {
    className: PropTypes.string,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.object]),
    closeBtn: PropTypes.string,
    close: PropTypes.func
};

export const headerDefaultProps = {
    className: '',
    text: '',
    closeBtn: 'closeBtn',
    close: () => {}
};

export const propTypes = {
    isOpen: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    hasOverlay: PropTypes.bool,
    closeOnOverlayClick: PropTypes.bool,
    closeOnEsc: PropTypes.bool,
    fullWidth: PropTypes.bool,
    children: PropTypes.node,
    header: PropTypes.shape(headerPropTypes),
    footer: PropTypes.shape(footerPropTypes)
};

export const defaultProps = {
    className: '',
    contentClassName: '',
    hasOverlay: true,
    closeOnOverlayClick: false,
    closeOnEsc: false,
    fullWidth: false,
    header: {
        className: '',
        text: '',
        closeIcon: true
    },
    footer: {
        className: '',
        actionButtons: [],
        leftNode: ''
    },
    children: null
};