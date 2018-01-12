import React, { Component } from 'react';
import classnames from 'classnames';
import ListItem from './ListItem';
import SearchBar from '../SearchBar';
import Card from '../Card';
import AccordionGroup from '../AccordionGroup';
import { propTypes, defaultProps } from './propTypes';

import styles from './styles.css';

export default class ListView extends Component {
    static propTypes = propTypes;
    static defaultProps = defaultProps;

    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            filteredItems: props.items,
            expandedGroups: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.items.length !== this.props.items.length) {
            this.setState({
                filteredItems: nextProps.items,
                searchValue: ''
            });
        }
    }

    onSearch = ({ value }) => {
        this.setState({
            searchValue: value
        });
    }

    onSearchSubmit = () => {
        const filteredItems = this.filterItems(this.state.searchValue);
        this.setState({
            filteredItems,
            expandedGroups: filteredItems.reduce((memo, curr) => {
                if (memo.indexOf(curr.itemGroup) === -1) {
                    memo.push(curr.itemGroup);
                }
                return memo;
            }, [])
        });
        this.props.onSearch({
            value: this.state.searchValue
        });
    }

    onSearchClear = () => {
        this.setState({
            searchValue: '',
            filteredItems: this.filterItems('')
        });
    }

    onSelect = ({ value, checked }) => {
        if (this.props.multiselect) {
            const newSelected = checked ? this.props.selected.concat(value) : this.props.selected.filter(itemValue => itemValue !== value);
            this.props.onChange(newSelected, this.props.listKey);
        } else {
            this.props.onChange(checked ? [value] : [], this.props.listKey);
        }
    }

    getListItem = (item) => {
        const { multiselect, selectable, selected } = this.props;
        return (
            <ListItem
                key={item.id}
                itemId={item.id}
                checkable={multiselect}
                selectable={selectable}
                label={item.label}
                sidenote={item.sidenote}
                rightNode={item.rightNode}
                selected={selected.indexOf(item.id) > -1}
                onSelect={this.onSelect} />
        );
    }

    filterItems = (value) => {
        const { items } = this.props;

        return items.filter(item => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1);
    }

    transformItems = () => {
        const { filteredItems } = this.state;

        return filteredItems.reduce((memo, curr) => {
            const group = memo.find(item => item.key === curr.itemGroup);
            if (group) {
                group.children.push(this.getListItem(curr));
            } else {
                memo.push({
                    key: curr.itemGroup,
                    title: curr.itemGroup,
                    children: [this.getListItem(curr)]
                });
            }

            return memo;
        }, []);
    }

    render() {
        const { searchable, nested, className } = this.props;
        const { filteredItems } = this.state;
        return (
            <Card contentClassName={styles.wrapper} className={classnames(styles.cardWrapper, className)}>
                {searchable &&
                <div className={styles.searchBarWrapper}>
                    <SearchBar
                        inputKey='listViewSearch'
                        value={this.state.searchValue}
                        onChange={this.onSearch}
                        onSubmit={this.onSearchSubmit}
                        inputProps={{
                            canClear: true,
                            onClear: this.onSearchClear
                        }} />
                </div>}
                { !nested ?
                    filteredItems.map(this.getListItem) :
                    <AccordionGroup
                        items={this.transformItems()}
                        expandedGroups={this.state.expandedGroups} />
                }
            </Card>
        );
    }
}