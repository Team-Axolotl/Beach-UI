import PropTypes from 'prop-types';
import { propTypes as RadioButton } from '../RadioButton/propTypes';

export const propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape(RadioButton)).isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf(['horizontal', 'vertical']),
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
        text: PropTypes.string,
        className: PropTypes.string
    })]),
    onClick: PropTypes.func
};

export const defaultProps = {
    className: '',
    type: 'horizontal',
    header: '',
    onClick: () => {}
};

