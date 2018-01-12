import { createElement } from 'react';
import classnames from 'classnames';
import propertyMapping from './propertyMapping';
import { propTypes, defaultProps } from './propTypes';
import styles from './styles.css';

const Box = ({
    tagName,
    children,
    ...rest
}) => {
    const className = classnames(rest.className, Object.keys(rest).map((key) => {
        if (typeof rest[key] === 'boolean') {
            return { [styles[key]]: rest[key] };
        }

        return styles[`${key}-${rest[key]}`];
    }));

    const style = Object.keys(rest).reduce((memo, current) => {
        if (propertyMapping[current]) {
            memo[propertyMapping[current]] = rest[current];
        }
        return memo;
    }, {});

    return createElement(tagName, { className, style }, children);
};

Box.propTypes = propTypes;
Box.defaultProps = defaultProps;

export default Box;