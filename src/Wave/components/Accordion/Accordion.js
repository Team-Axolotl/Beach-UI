import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './styles.css';
import { propTypes, defaultProps } from './propTypes';
import Icon from '../Icon';

export default class Accordion extends Component {
    static propTypes = propTypes

    static defaultProps = defaultProps;

    constructor(props) {
        super(props);

        this.state = {
            expanded: props.expanded
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.expanded !== this.props.expanded) {
            this.setState({
                expanded: nextProps.expanded
            });
        }
    }

    get classes() {
        const { className } = this.props;

        return {
            accordionTitle: classnames(styles.accordionTitle, className, {
                [styles.borderBottom]: this.state.expanded
            }),
            accordionDirection: classnames(styles.accordionDirection, className, {
                [styles.expanded]: this.state.expanded
            })
        };
    }

    handleToggle = () => {
        const newValue = !this.state.expanded;
        const methodName = newValue ? 'onExpand' : 'onCollapse';
        this.props[methodName]({
            key: this.props.accordionKey
        });
        this.setState({ expanded: newValue });
    }

    render() {
        const { title, className, children } = this.props;
        const { expanded } = this.state;

        return (
            <div className={classnames(styles.accordionWrapper, className)}>
                <div className={this.classes.accordionTitle} onClick={this.handleToggle}>
                    <div className={this.classes.accordionDirection}>
                        <Icon glyph='arrow_accordion' />
                    </div>
                    { title }
                </div>
                {
                    expanded &&
                    <div className={styles.childrenContainer}>
                        { children }
                    </div>
                }
            </div>
        );
    }
}