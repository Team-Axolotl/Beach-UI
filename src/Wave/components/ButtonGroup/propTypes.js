import PropTypes from 'prop-types';
import { propTypes as Button } from '../Button/propTypes';

export const propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape(Button)).isRequired,
    type: PropTypes.oneOf(['vertical', 'horizontal']),
    className: PropTypes.string
};

export const defaultProps = {
    type: 'horizontal',
    className: ''
};