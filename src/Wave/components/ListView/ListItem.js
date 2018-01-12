import React, { Component } from 'react';
import classnames from 'classnames';
import Checkbox from '../Checkbox';
import { listItemPropTypes, listItemDefaultProps } from './propTypes';
import styles from './styles.css';

export default class ListItem extends Component {
    static propTypes = listItemPropTypes;
    static defaultProps = listItemDefaultProps;

    onItemClick = () => {
        const { selectable, checkable, itemId, selected } = this.props;
        if (selectable || checkable) {
            this.props.onSelect({
                value: itemId,
                checked: !selected
            });
        }
    }

    get classes() {
        const { selectable, selected } = this.props;

        return {
            itemWrapper: classnames(styles.itemWrapper, {
                [styles.selectedItem]: selected && selectable
            })
        };
    }

    render() {
        const { itemId, checkable, label, sidenote, rightNode, selected } = this.props;
        const classes = this.classes;

        return (
            <div className={classes.itemWrapper} onClick={this.onItemClick}>
                {checkable &&
                <div>
                    <Checkbox
                        value={itemId}
                        checked={selected}
                        onClick={this.props.onSelect} />
                </div>}
                <div className={styles.labelContainer}>
                    <span className={styles.itemLabel}>{label}</span>
                    {sidenote && <span className={styles.itemSidenote}>{sidenote}</span>}
                </div>
                {rightNode && <div className={styles.rightNodeContainer}>{rightNode}</div>}
            </div>
        );
    }
}
