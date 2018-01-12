// PLEASE, do not touch. It's magic. #unicorn!
import React, { Component } from 'react';
import classnames from 'classnames';
import Menu from '../Menu';
import Input from '../Input';
import Icon from '../Icon';
import { defaultProps, propTypes } from './propTypes';

import styles from './styles.css';

export default class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            filterValue: '',
            filteredItems: [],
            hasActiveFilter: false
        };
    }

    componentWillMount() {
        // Set filtered item initial in state because menu is reading from there to display options
        this.filterItems();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.filterValue !== prevState.filterValue) {
            // Update filtered items when filter value has changed
            this.filterItems();
        }
    }

    onFilter = ({ value }) => {
        // On filter value change
        this.setState({
            filterValue: value,
            hasActiveFilter: true
        });
    }

    onItemSelect = ({ id }) => {
        // When selecting menu item - call onChange callback with the new value and then clear filter value
        const { onChange, inputKey } = this.props;
        onChange({
            key: inputKey,
            value: id
        });
        this.setState({
            filterValue: ''
        });
    }

    onRequestClose = () => {
        // onRequestClose callback from Menu component (triggered on outside click or other internal close logic related to Menu's specificies)
        this.setState({
            open: false
        });
        // Blur input node onRequestClose to trigger its onBlur method and remove CSS class focused
        if (this.input) {
            this.input.blur();
        }
    }

    onTargetBlur = () => {
        // On target blur - clear filter value and close menu
        this.setState({
            open: false,
            filterValue: '',
            hasActiveFilter: false
        });
    }

    onTargetFocus = () => {
        // On target focus open menu
        this.setState({
            open: true
        });
    }

    onClear = () => {
        // On Input's clear button click 
        const { inputKey, onChange } = this.props;
        onChange({
            key: inputKey,
            value: ''
        });
    }

    getSelectedItemLabel = () => {
        // Get menu item's label based on its value
        const { items, value } = this.props;
        const selectedItem = items.find(item => item.id.toString() === value.toString());
        return selectedItem && selectedItem.label;
    }

    get inputValue() {
        // Input value is the selected item's label if there are no active entered search
        const { filterValue } = this.state;
        if (!this.state.hasActiveFilter) {
            const itemLabel = this.getSelectedItemLabel();
            return itemLabel || '';
        }
        return filterValue;
    }

    filterItems = () => {
        // Filter items based on filter value
        const { items } = this.props;
        const { filterValue } = this.state;
        const filteredItems = items.filter(
            item => item.label.toLowerCase().indexOf(filterValue.toLowerCase()) > -1
        );
        this.setState({
            filteredItems
        });
    }

    render() {
        const { value, inputKey, clearable, searchable, placeholder, disabled } = this.props;
        const { open, filteredItems } = this.state;
        return (
            <Menu
                open={open}
                targetWidth
                closeOnSelect
                selectedId={value}
                position='bottom-left'
                additionalOffsets={{ bottom: -10 }}
                target={
                    <Input
                        {...this.props}
                        canClear={clearable}
                        rightButtonClassname={classnames(styles.ddArrow, {
                            [styles.readOnly]: disabled
                        })}
                        rightButton={<Icon glyph='dropdown_arrow' />}
                        ref={(input) => { this.input = input; }}
                        inputKey={inputKey}
                        value={this.inputValue}
                        disabled={disabled}
                        readOnly={!disabled && !searchable}
                        placeholder={placeholder}
                        onChange={this.onFilter}
                        onBlur={this.onTargetBlur}
                        onFocus={this.onTargetFocus}
                        onClear={this.onClear} />
                }
                items={filteredItems}
                onItemSelect={this.onItemSelect}
                onRequestClose={this.onRequestClose} />
        );
    }
}

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;