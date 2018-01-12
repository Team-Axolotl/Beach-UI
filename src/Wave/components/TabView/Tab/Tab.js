import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import Icon from '../../Icon';
import { propTypes, defaultProps } from './propTypes';

import styles from './styles.css';

export default class Tab extends Component {
    static propTypes = propTypes;
    static defaultProps = defaultProps;

    onClick = (e) => {
        const { id, url, title, onClick } = this.props;
        const linkNode = findDOMNode(this.linkNode);

        // click event on Link is not triggered when it is wrapped 
        if (linkNode && e.target !== linkNode) {
            linkNode.click();
        }

        onClick({ id, url, title });
    }

    get className() {
        const { type, active, className } = this.props;

        return classnames(styles[type], { [styles.active]: active }, className);
    }

    close = (e) => {
        const { id, url, close } = this.props;

        e.stopPropagation();
        close({ id, url });
    }

    render() {
        const {
            titleClassName,
            title,
            url,
            closeable,
            errors
        } = this.props;

        return (
            <div className={this.className} onClick={this.onClick}>
                { url ? <Link ref={(node) => { this.linkNode = node; }} to={url} className={classnames(styles.link, titleClassName)}>
                    { title }
                </Link> : <span className={classnames(styles.link, titleClassName)}>{ title }</span> }
                { errors.length > 0 && <div className={styles.error}>{ errors.length }</div> }
                <div className={classnames(styles.closeBtn, { [styles.visible]: closeable })} onClick={this.close}>
                    <Icon glyph='close' />
                </div>
            </div>
        );
    }
}