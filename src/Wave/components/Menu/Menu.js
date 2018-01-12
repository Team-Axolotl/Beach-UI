import React, { Component } from 'react';
import helpers from '../../helpers';
import MenuItem from './MenuItem';
import { propTypes, defaultProps } from './propTypes';

import styles from './styles.css';

export default class Menu extends Component {
    static propTypes = propTypes

    static defaultProps = defaultProps

    componentWillMount() {
        window.addEventListener('click', this.onGlobalClick);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onGlobalClick);
    }

    onGlobalClick = (e) => {
        const { open, onRequestClose } = this.props;
        if (open && this.targetNode && !this.containerNode.contains(e.target)) {
            onRequestClose('click-outside');
        }
    }

    onMenuItemClick = (id) => {
        const { items, closeOnSelect, onItemSelect, onRequestClose } = this.props;
        const selectedItem = items.find(item => item.id.toString() === id.toString());
        onItemSelect(selectedItem);
        if (closeOnSelect) {
            onRequestClose('select');
        }
    }

    onTargetMouseDown = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    get dimensions() {
        const { position, additionalOffsets } = this.props;
        if (!this.targetNode) {
            return {};
        }
        const node = this.targetNode.querySelector('[data-menu-target=true]');
        return helpers.getDimensions(position, node || this.targetNode, additionalOffsets);
    }

    render() {
        const { open, target, items, selectedId, leftIcon, rightIcon, fixedWidth, targetWidth } = this.props;
        const itemsContainerStyles = Object.assign({}, this.dimensions);
        if (fixedWidth) {
            itemsContainerStyles.width = `${fixedWidth}px`;
        } else if (targetWidth && this.targetNode) {
            const width = `${this.targetNode.getBoundingClientRect().width}px`;
            itemsContainerStyles.width = width;
        }
        return (
            <div
                ref={(node) => { this.containerNode = node; }}
                className={styles.menuContainer}>
                <div
                    className={styles.targetContainer}
                    ref={(node) => { this.targetNode = node; }} >
                    {target}
                </div>
                {
                    this.targetNode && open ?
                        <div
                            onMouseDown={this.onTargetMouseDown}
                            className={styles.menuItemsContainer}
                            style={itemsContainerStyles} >
                            {
                                items.map(item => (
                                    <MenuItem
                                        key={item.id}
                                        id={item.id}
                                        label={item.label}
                                        selected={selectedId.toString() === item.id.toString()}
                                        leftIcon={leftIcon}
                                        rightIcon={rightIcon}
                                        onItemClick={this.onMenuItemClick} />
                                ))
                            }
                            {
                                items.length ?
                                    null :
                                    <span
                                        title='No items to show.'
                                        className={styles.noItemsMsg}>No items to show.</span>
                            }
                        </div> :
                        null
                }
            </div>
        );
    }
}
