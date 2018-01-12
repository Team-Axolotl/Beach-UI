import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { find, difference } from 'lodash';
import { buildTree, addTreeNode, deleteTreeNode, moveTreeNode, filterTree, mapMenuItems } from './helpers';
import { uuid, capitalizeFirstLetter } from '../../helpers/utils';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import { Col, Row } from '../Layout';
import Menu from '../Menu';
import SearchBar from '../SearchBar';
import TreeNode from './TreeNode';
import { actionsConfig } from './config';
import styles from './styles.css';

export default class TreeView extends Component {
    static propTypes = {
        tree: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
        })).isRequired,
        selected: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            name: PropTypes.string
        }),
        showChildrenCount: PropTypes.bool,
        searchable: PropTypes.bool,
        contextMenu: PropTypes.bool,
        addLabel: PropTypes.string,
        removeLabel: PropTypes.string,
        actionButtonType: PropTypes.oneOf([
            'primaryLight',
            'primaryDark',
            'primaryBlue'
        ]),
        actions: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.arrayOf(PropTypes.oneOf(['add', 'remove', 'move']))
        ]),
        addMenuItems: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired,
            params: PropTypes.shape({
                type: PropTypes.string
            })
        })),
        nodeTemplate: PropTypes.object,
        onAddNode: PropTypes.func,
        onDeleteNode: PropTypes.func,
        onMoveNode: PropTypes.func,
        onNodeClick: PropTypes.func,
        onExpandNode: PropTypes.func,
        onSearchChange: PropTypes.func,
        onSearchSubmit: PropTypes.func,
        onSearchClear: PropTypes.func,
        onMenuItemSelect: PropTypes.func
    }
    static defaultProps = {
        selected: {},
        showChildrenCount: true,
        searchable: true,
        contextMenu: true,
        addLabel: 'Add',
        removeLabel: 'Remove',
        actionButtonType: 'primaryLight',
        actions: ['add', 'move', 'remove'],
        addMenuItems: [],
        nodeTemplate: {},
        onAddNode: () => {},
        onDeleteNode: () => {},
        onMoveNode: () => {},
        onNodeClick: () => {},
        onExpandNode: () => {},
        onSearchChange: () => {},
        onSearchSubmit: () => {},
        onSearchClear: () => {},
        onMenuItemSelect: () => {}
    }
    constructor() {
        super();

        this.state = {
            filter: '',
            showFiltered: false,
            expanded: [],
            isMenuOpen: false
        };
        // bound in constructor because otherwise it receives the this from TreeNode
        this.toggleExpand = this.toggleExpand.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // Clear filter when there are no results and a new node is added
        if (this.props.tree.length < nextProps.tree.length && this.state.filter) {
            this.clearFilter();
        }
    }

    onFilterChange = ({ value }) => {
        this.setState({ filter: value });
        this.props.onSearchChange({ value });
    }

    onFilterSubmit = ({ key, value }) => {
        this.setState({ showFiltered: true });
        this.props.onSearchSubmit({ key, value });
    }

    onFilterClear = () => {
        this.setState({
            filter: '',
            showFiltered: false
        });
        this.props.onSearchClear();
    }

    onContextMenuClick = ({ id, label, params }) => {
        const handler = this[`${params.action}Node`];

        if (handler) {
            handler({ id, label, params });
        }

        this.props.onMenuItemSelect({ id, label, params });
    }

    onItemSelect = ({ id, label, params }) => {
        this.addNode({ params });
        this.props.onMenuItemSelect({ id, label, params });
    }

    get treeItems() {
        const { selected, onNodeClick, showChildrenCount } = this.props;
        const { showFiltered, filter, expanded } = this.state;
        const tree = buildTree(this.props.tree);
        const treeItems = showFiltered ? filterTree({ tree, filter }) : tree;

        return treeItems.map((treeItem) => {
            const { id, name, children, parentId, type } = treeItem;

            return (
                <TreeNode
                    key={id}
                    id={id}
                    parentId={parentId}
                    type={type}
                    name={name}
                    selected={selected}
                    childNodes={children}
                    contextMenuItems={this.contextMenuItems}
                    onContextMenuClick={this.onContextMenuClick}
                    expandedNodes={expanded}
                    showChildrenCount={showChildrenCount}
                    toggleExpand={this.toggleExpand}
                    onNodeClick={onNodeClick} />
            );
        });
    }

    get addButton() {
        const { actionButtonType, addLabel, addMenuItems } = this.props;
        const { isMenuOpen } = this.state;

        const addButton = (
            <Button
                type={actionButtonType}
                label={addLabel}
                onClick={addMenuItems.length ? this.toggleMenu : this.addNode} />
        );

        if (addMenuItems.length) {
            return (
                <Menu
                    open={isMenuOpen}
                    target={addButton}
                    targetWidth={false}
                    items={addMenuItems}
                    onItemSelect={this.onItemSelect}
                    onRequestClose={this.toggleMenu} />
            );
        }

        return addButton;
    }

    get moveButtons() {
        return [{
            className: styles.btnIcon,
            icon: 'dropdown_arrow',
            disabled: !this.props.selected.id,
            type: this.props.actionButtonType,
            onClick: this.moveDownNode
        }, {
            className: classnames(styles.btnIcon, styles.moveUp),
            icon: 'dropdown_arrow',
            disabled: !this.props.selected.id,
            type: this.props.actionButtonType,
            onClick: this.moveUpNode
        }];
    }

    get contextMenuItems() {
        const { actions, addMenuItems, contextMenu } = this.props;

        if (contextMenu && actions) {
            const actionItems = actions.indexOf('move') !== -1 ? this.props.actions.concat(['moveUp', 'moveDown']) : actions;
            
            return contextMenu && mapMenuItems(this.props.addMenuItems).concat(actionItems.map((action) => {
                const actionConfig = actionsConfig[action];

                if (actionConfig && !(addMenuItems.length && action === 'add')) {
                    return {
                        ...actionConfig,
                        label: this.props[`${action}Label`] || actionConfig.label,
                        params: { action }
                    };
                }
            })).filter(item => item !== undefined);
        }

        return [];
    }

    addNode = ({ params = { type: '' } }) => {
        const node = Object.assign({}, {
            id: uuid(),
            name: capitalizeFirstLetter(params.type || 'Name'),
            parentId: this.props.selected.id || null,
            type: params.type,
            children: []
        }, this.props.nodeTemplate);
        const tree = addTreeNode({ tree: this.props.tree, node });
        this.props.onAddNode({ tree, prevTree: this.props.tree, node });

        // toggle expand only if the parent wasn't previously expanded
        if (this.state.expanded.indexOf(node.parentId) === -1) {
            this.toggleExpand(node.parentId);
        }
    }

    removeNode = () => {
        const { tree, selected } = this.props;
        const newTree = deleteTreeNode({ tree, node: selected });

        this.props.onDeleteNode({ tree: newTree, prevTree: tree, removed: selected });
    }

    moveNode = ({ direction }) => {
        const { tree, selected } = this.props;
        const newTree = moveTreeNode({ tree, node: selected, direction });

        if (newTree !== tree) {
            this.props.onMoveNode({
                tree: newTree,
                prevTree: tree,
                movedNode: selected,
                direction
            });
        }
    }

    moveUpNode = () => {
        this.moveNode({ direction: -1 });
    }

    moveDownNode = () => {
        this.moveNode({ direction: 1 });
    }

    toggleExpand(id) {
        const expanded = this.state.expanded.indexOf(id) !== -1;

        if (expanded) {
            const children = find(this.props.tree, { id }).children;
            this.setState({ expanded: difference(this.state.expanded.filter(nodeId => nodeId !== id), children) });
        } else {
            this.setState({ expanded: this.state.expanded.concat([id]) });
        }

        this.props.onExpandNode({ id, expanded });
    }

    toggleMenu = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

    render() {
        const { searchable, actions, removeLabel, actionButtonType, selected } = this.props;
        const { filter } = this.state;

        return (
            <Col auto>
                <Col padded fixed>
                    <Row justify='spaceBetween' className={styles.actionButtonsContainer}>
                        { actions && actions.indexOf('add') !== -1 && this.addButton }
                        { actions && actions.indexOf('move') !== -1 &&
                            <ButtonGroup
                                type='horizontal'
                                buttons={this.moveButtons} /> }
                        { actions && actions.indexOf('remove') !== -1 &&
                            <Button
                                type={actionButtonType}
                                label={removeLabel}
                                disabled={!selected.id}
                                onClick={this.removeNode} /> }
                    </Row>
                    { searchable &&
                        <SearchBar
                            inputKey='filter'
                            inputProps={{
                                canClear: true,
                                onClear: this.onFilterClear
                            }}
                            value={filter}
                            onChange={this.onFilterChange}
                            onSubmit={this.onFilterSubmit} /> }
                </Col>
                <Col auto scrollX scrollY>
                    { this.treeItems.length ?
                        this.treeItems :
                        <div className={styles.noData}>No data</div> }
                </Col>
            </Col>
        );
    }
}