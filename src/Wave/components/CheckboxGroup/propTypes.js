import PropTypes from 'prop-types';
import { propTypes as Checkbox } from '../Checkbox/propTypes';

export const propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(Checkbox)).isRequired,
    type: PropTypes.oneOf(['horizontal', 'vertical']),
    className: PropTypes.string,
    onClick: PropTypes.func
};

export const defaultProps = {
    type: 'horizontal',
    className: '',
    onClick: () => {}
};
