import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';
import Menu from '../Menu';
import { DEFAULT_MARGIN } from './config';
import styles from './styles.css';

export default class TreeNode extends Component {
    static propTypes = {
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        type: PropTypes.string,
        childNodes: PropTypes.array,
        expanded: PropTypes.bool,
        showChildrenCount: PropTypes.bool,
        nestLevel: PropTypes.number,
        selected: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        }),
        contextMenuItems: PropTypes.array,
        expandedNodes: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
        toggleExpand: PropTypes.func.isRequired,
        onNodeClick: PropTypes.func,
        onContextMenuClick: PropTypes.func
    }

    static defaultProps = {
        parentId: null,
        type: '',
        childNodes: [],
        expanded: false,
        showChildrenCount: true,
        nestLevel: 0,
        selected: {},
        contextMenuItems: [],
        expandedNodes: [],
        onNodeClick: () => {},
        onContextMenuClick: () => {}
    }

    constructor() {
        super();

        this.state = {
            isMenuOpen: false
        };
    }

    onClick = () => {
        const { id, name, parentId, childNodes, onNodeClick } = this.props;

        onNodeClick({ id, name, parentId, children: childNodes });
    }

    get childNodes() {
        const { expanded, showChildrenCount, nestLevel, childNodes, selected, contextMenuItems, expandedNodes } = this.props;
        const { onNodeClick, toggleExpand, onContextMenuClick } = this.props;

        return childNodes.map((child) => {
            const { id, name, children, parentId, type } = child;

            return (
                <TreeNode
                    key={id}
                    id={id}
                    name={name}
                    childNodes={children}
                    parentId={parentId}
                    type={type}
                    showChildrenCount={showChildrenCount}
                    expandedNodes={expandedNodes}
                    expanded={expanded}
                    selected={selected}
                    contextMenuItems={contextMenuItems}
                    nestLevel={nestLevel + 1}
                    toggleExpand={toggleExpand}
                    onNodeClick={onNodeClick}
                    onContextMenuClick={onContextMenuClick} />
            );
        });
    }

    get name() {
        const { showChildrenCount, type, name, childNodes } = this.props;

        if (showChildrenCount && type === 'group') {
            return `${name} {${childNodes.length}}`;
        }

        return name;
    }

    get expanded() {
        return this.props.expanded || this.props.expandedNodes.indexOf(this.props.id) !== -1;
    }

    get classNames() {
        const { id, childNodes, selected } = this.props;

        return {
            treeNode: classnames(styles.treeNode, {
                [styles.selected]: selected.id === id
            }),
            expandIcon: classnames(styles.expandIcon, {
                [styles.hidden]: !childNodes.length,
                [styles.expanded]: this.expanded
            }),
            label: classnames(styles.label, {
                [styles.selected]: selected.id === id
            })
        };
    }

    expand = () => {
        this.props.toggleExpand(this.props.id);
    }

    toggleMenu = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

    render() {
        const { contextMenuItems, nestLevel, onContextMenuClick } = this.props;
        const { isMenuOpen } = this.state;

        return (
            <div className={styles.treeNodeContainer}>
                <div className={this.classNames.treeNode} onClick={this.onClick}>
                    <div className={styles.labelContainer} style={{ marginLeft: DEFAULT_MARGIN * nestLevel }}>
                        <div className={this.classNames.expandIcon} onClick={this.expand}>
                            <Icon glyph='arrow_accordion' />
                        </div>
                        <span className={this.classNames.label}>{ this.name }</span>
                        { contextMenuItems.length ?
                            <div className={styles.menuContainer} onClick={this.toggleMenu}>
                                <Menu
                                    open={isMenuOpen}
                                    target={<Icon glyph='' />}
                                    position='bottom-right'
                                    targetWidth={false}
                                    items={contextMenuItems}
                                    onItemSelect={onContextMenuClick}
                                    onRequestClose={this.toggleMenu} />
                            </div> : null }
                    </div>
                </div>
                { this.expanded && this.childNodes }
            </div>
        );
    }
}