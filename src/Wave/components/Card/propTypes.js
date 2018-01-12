import PropTypes from 'prop-types';

export const propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    header: PropTypes.shape({
        type: PropTypes.oneOf(['simpleCard', 'contentBox']),
        title: PropTypes.string,
        rightLabel: PropTypes.string,
        className: PropTypes.string,
        button: PropTypes.object,
        component: PropTypes.node
    })
};

export const defaultProps = {
    className: '',
    contentClassName: '',
    header: null
};

export const headerPropTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    component: PropTypes.node,
    type: PropTypes.oneOf([
        'simpleCard',
        'contentBox'
    ]),
    headerButton: PropTypes.shape({
        onClick: PropTypes.func,
        type: PropTypes.oneOf([
            'default',
            'primaryLight',
            'primaryDark',
            'primaryBlue',
            'longButton',
            'primaryLong',
            'secondaryLong'
        ]),
        label: PropTypes.string,
        disabled: PropTypes.bool
    }),
    rightLabel: PropTypes.string
};

export const headerDefaultProps = {
    title: '',
    className: '',
    type: 'simpleCard',
    rightLabel: '',
    headerButton: {},
    component: null
};