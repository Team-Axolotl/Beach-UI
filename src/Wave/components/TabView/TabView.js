import React, { Component } from 'react';
import classnames from 'classnames';
import ScrollableContainer from '../ScrollableContainer';
import Slide from '../../transitions/Slide';
import Tab from './Tab';
import { propTypes, defaultProps } from './propTypes';

import styles from './styles.css';

export default class TabView extends Component {
    static propTypes = propTypes;
    static defaultProps = defaultProps;

    constructor() {
        super();

        this.state = {
            shouldAnimate: false,
            forceScroll: false
        };
    }

    // This logic is needed to disable the animation when tehre is only one item
    componentWillReceiveProps(nextProps) {
        if (this.props.items.length < nextProps.items.length && this.props.items.length !== 1) {
            this.setState({ shouldAnimate: true })
        }
    }

    onItemSelect = ({ params }) => {
        this.props.onClick({ url: params.url });
    }

    onCloseClick = (id) => {
        this.props.onClose({ url: id });
    }

    get tabs() {
        const {
            items,
            active,
            type,
            errors
        } = this.props;

        const { onClick, onClose } = this.props;

        return items.map((item, index) => {
            const { id, title, url } = item;

            const itemNode = (
                <Tab
                    key={index}
                    id={id}
                    type={type}
                    url={url}
                    title={title}
                    active={active.url === url}
                    errors={errors[id]}
                    closeable={items.length > 1 && type === 'tab'}
                    onClick={onClick}
                    close={onClose} />);

            if (this.animated) {
                return (
                    <Slide
                        key={index}
                        onExit={this.forceScroll}>
                        { itemNode }
                    </Slide>
                );
            }

            return itemNode;
        });
    }

    get animated() {
        return this.props.animated && this.state.shouldAnimate;
    }

    get menuItems() {
        return this.props.items.map(item => ({
            id: item.url,
            label: item.title,
            params: { url: item.url }
        }));
    }

    get menu() {
        return {
            position: 'bottom-right',
            items: this.menuItems,
            selectedId: this.props.active.url,
            onItemSelect: this.onItemSelect,
            rightIcon: {
                glyph: 'close',
                className: styles.closeIcon,
                onClick: this.onCloseClick
            }
        };
    }

    /* This workaround is needed when the ScrollableContainer is animated
    because onExited callback of the CSSTansition doesn't delete an item 
    due to the reason it is not a direct child of the TransitionGroup */
    forceScroll = () => {
        this.setState({ forceScroll: !this.state.forceScroll });
    }

    render() {
        const {
            className,
            type,
            active,
            activeIndex
        } = this.props;

        return (
            <div className={classnames(styles.navigationContainer, styles[`${type}Container`], className)}>
                <ScrollableContainer
                    animated={this.animated}
                    bordered
                    forceScroll={this.state.forceScroll}
                    active={active}
                    activeIndex={activeIndex}
                    menu={this.menu}>
                    { this.tabs }
                </ScrollableContainer>
            </div>
        );
    }
}
