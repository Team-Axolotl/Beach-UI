import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import { propTypes, defaultProps } from './propTypes';
import styles from './styles.css';

const getClassName = className => (styles[className] || className);

const Button = ({
    className,
    type,
    role,
    label,
    disabled,
    disabledClassName,
    iconContainerClassName,
    iconClassName,
    href,
    icon,
    onClick
}) => {
    let btnClass = Array.isArray(className) ? className.map(name => getClassName(name)) : getClassName(className);
    btnClass = classnames(btnClass, styles[type], { [styles.disabled]: disabled }, disabledClassName);

    const button = (
        <button disabled={disabled} type={role} className={btnClass} onClick={onClick}>
            { label && <span>{ label }</span> }
            { icon &&
                <div className={iconContainerClassName}>
                    <Icon className={iconClassName} glyph={icon} />
                </div> }
        </button>
    );

    if (href) {
        return (
            <Link className={styles.linkBtn} to={href}>
                { button }
            </Link>
        );
    }

    return button;
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;