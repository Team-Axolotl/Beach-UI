import PropTypes from 'prop-types';
import { propTypes as Button } from '../../Button/propTypes';

export const propTypes = {
    titleBar: PropTypes.shape({
        title: PropTypes.string,
        actionButtons: PropTypes.arrayOf(PropTypes.shape(Button)),
        component: PropTypes.node
    }),
    tabSet: PropTypes.shape({
        id: PropTypes.string,
        items: PropTypes.array,
        type: PropTypes.string,
        validate: PropTypes.bool,
        animated: PropTypes.bool
    }),
    errors: PropTypes.object,
    children: PropTypes.node
};

export const defaultProps = {
    titleBar: null,
    tabSet: null,
    errors: {},
    children: null
};