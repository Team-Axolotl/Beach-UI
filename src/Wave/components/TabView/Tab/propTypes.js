import PropTypes from 'prop-types';

export const propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    active: PropTypes.bool.isRequired,
    className: PropTypes.string,
    titleClassName: PropTypes.string,
    url: PropTypes.string,
    closeable: PropTypes.bool,
    title: PropTypes.string,
    errors: PropTypes.array,
    close: PropTypes.func
};

export const defaultProps = {
    className: 'tab',
    title: '',
    titleClassName: '',
    url: '',
    closeable: false,
    errors: [],
    close: () => {}
};