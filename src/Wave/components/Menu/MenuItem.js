import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
import {
    menuItemDefaultProps as defaultProps,
    menuItemPropTypes as propTypes
} from './propTypes';

import styles from './styles.css';

export default class MenuItem extends Component {
    static propTypes = propTypes

    static defaultProps = defaultProps

    componentDidMount() {
        const { selected } = this.props;
        if (selected) {
            this.containerNode.scrollIntoView();
        }
    }

    componentWillReceiveProps(nextProps) {
        const { selected } = this.props;
        if (!selected && nextProps.selected) {
            this.containerNode.scrollIntoView();
        }
    }

    onLeftIconClick = () => {
        const { leftIcon, id } = this.props;
        leftIcon.onClick(id);
    }

    onItemClick = () => {
        const { onItemClick, id } = this.props;
        onItemClick(id);
    }

    onRightIconClick = () => {
        const { rightIcon, id } = this.props;
        rightIcon.onClick(id);
    }

    get classes() {
        const { selected, leftIcon, rightIcon } = this.props;
        return {
            container: classnames(styles.item, {
                [styles.selected]: selected
            }),
            leftIcon: classnames(styles.leftIcon, leftIcon && leftIcon.className),
            label: classnames(styles.itemLabel, {
                [styles.selected]: selected
            }),
            rightIcon: classnames(styles.rightIcon, rightIcon && rightIcon.className)
        };
    }

    render() {
        const { label, leftIcon, rightIcon } = this.props;
        const classes = this.classes;
        return (
            <div
                ref={(node) => { this.containerNode = node; }}
                className={classes.container} >
                {
                    leftIcon ?
                        <span
                            className={classes.leftIcon}
                            onClick={this.onLeftIconClick}>
                            <Icon glyph={leftIcon.glyph} />
                        </span> :
                        null
                }
                <span
                    title={label}
                    className={classes.label}
                    onClick={this.onItemClick}>{label}</span>
                {
                    rightIcon ?
                        <span
                            className={classes.rightIcon}
                            onClick={this.onRightIconClick}>
                            <Icon glyph={rightIcon.glyph} />
                        </span> :
                        null
                }
            </div>
        );
    }
}
