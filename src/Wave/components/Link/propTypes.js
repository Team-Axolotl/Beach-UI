import PropTypes from 'prop-types';

export const propTypes = { 
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    to: PropTypes.string.isRequired,
    navigationId: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.any,
    shouldAddTab: PropTypes.bool,
    preventRedirect: PropTypes.bool,
    onClick: PropTypes.func,
    addTab: PropTypes.func
};

export const defaultProps = {
    className: '',
    title: '',
    navigationId: 'mainNavigation',
    children: null,
    shouldAddTab: false,
    preventRedirect: false,
    onClick: () => {},
    addTab: () => {}
};