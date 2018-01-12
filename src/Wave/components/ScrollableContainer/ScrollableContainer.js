import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import { TransitionGroup } from 'react-transition-group';
import debounce from 'lodash/debounce';
import Icon from '../Icon';
import { SCROLL_INTERVAL, MENU_WIDTH, SCROLL_TIMEOUT } from './config';
import Container from './Container';
import Menu from '../Menu';
import { propTypes, defaultProps } from './propTypes';

import styles from './styles.css';

export default class ScrollableContainer extends Component {
    static propTypes = propTypes;
    static defaultProps = defaultProps;

    constructor() {
        super();

        this.state = {
            left: 0,
            showMenu: false,
            isMenuOpen: false
        };
    }

    componentDidMount() {
        window.addEventListener('resize', debounce(this.scroll, SCROLL_INTERVAL));

        this.scroll();
    }

    componentWillReceiveProps(nextProps) {
        /* This workaround is needed when the ScrollableContainer is animated
        because onExited callback of the CSSTansition doesn't delete an item 
        due to the reason it is not a direct child of the TransitionGroup */
        if (this.props.animated && this.props.forceScroll !== nextProps.forceScroll) {
            setTimeout(this.scroll, SCROLL_TIMEOUT);
        }
    }

    componentDidUpdate(prevProps) {
        const { activeIndex, children } = prevProps;

        if (activeIndex !== this.props.activeIndex) {
            this.scroll();
        }

        if (children && children.length !== this.props.children.length) {
            this.scroll();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.scroll);
    }

    get menuNode() {
        const { className, menuIcon } = this.props.menu;
        const { showMenu } = this.state;

        return (
            <div
                className={classnames(styles.menu, { [styles.visible]: showMenu }, className)}
                onClick={this.toggleMenu}>
                {
                    showMenu &&
                    <span className={classnames(styles.menuIcon, menuIcon)}>
                        <Icon glyph='dropdown_maintabs' />
                    </span>
                }
            </div>
        );
    }

    scroll = () => {
        const itemsContainer = findDOMNode(this.itemsContainer);
        const activeTab = itemsContainer && itemsContainer.children[this.props.activeIndex];

        if (!activeTab) {
            return;
        }

        if (this.state.isMenuOpen) {
            this.setState({
                isMenuOpen: false
            });
        }

        const menuWidth = this.props.menu ? MENU_WIDTH : 0;
        const width = this.container.offsetWidth - menuWidth;
        const maxLeft = width - activeTab.offsetLeft - activeTab.offsetWidth;

        this.setState({
            showMenu: this.props.menu && itemsContainer.offsetWidth > width,
            left: maxLeft > 0 ? 0 : maxLeft,
            width
        });
    }

    toggleMenu = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

    render() {
        const { className, menu, animated, border, bordered, children } = this.props;
        const { width, left, isMenuOpen } = this.state;

        return (
            <div ref={(node) => { this.container = node; }} className={classnames(styles.container, className)}>
                <div ref={(node) => { this.scrollable = node; }} className={styles.scrollableContainer} style={{ width }}>
                    { animated ?
                        <TransitionGroup
                            ref={(node) => { this.itemsContainer = node; }}
                            component={Container}
                            left={left}
                            className={styles.itemsContainer}>
                            { children }
                        </TransitionGroup> :
                        <Container ref={(node) => { this.itemsContainer = node; }} left={left} className={styles.itemsContainer}>
                            { children }
                        </Container> }

                    { bordered && <div className={classnames(styles.border, border)} /> }
                </div>
                { menu && <Menu
                    open={isMenuOpen}
                    position={menu.position}
                    rightIcon={menu.rightIcon}
                    targetWidth={false}
                    selectedId={menu.selectedId}
                    target={this.menuNode}
                    items={menu.items}
                    onItemSelect={menu.onItemSelect}
                    onRequestClose={this.toggleMenu} /> }
            </div>
        );
    }
}