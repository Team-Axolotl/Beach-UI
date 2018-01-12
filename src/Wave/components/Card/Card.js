import React from 'react';
import classnames from 'classnames';
import CardHeader from './CardHeader';
import { propTypes, defaultProps } from './propTypes';

import styles from './styles.css';

const Card = ({
    className,
    contentClassName,
    children,
    header
}) => {
    return (
        <div className={classnames(styles.cardContainer, className)}>
            { header && <CardHeader
                type={header.type}
                className={header.className}
                headerButton={header.button}
                title={header.title}
                component={header.component}
                rightLabel={header.rightLabel} />}
            <div className={classnames(styles.content, contentClassName)}>
                { children }
            </div>
        </div>
    );
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;