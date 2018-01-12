import React, { Component } from 'react';
import Accordion from '../Accordion';
import { propTypes, defaultProps } from './propTypes';

import styles from './styles.css';

export default class AccordionGroup extends Component {
    static propTypes = propTypes

    static defaultProps = defaultProps;

    constructor(props) {
        super(props);

        // { values: { key1: false, key2: true, key3: false }}
        this.state = {
            values: this.parseItems(props.items, props.expandedGroups)
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.items.length !== nextProps.items.length || this.props.expandedGroups.length !== nextProps.expandedGroups.length) {
            this.setState({
                values: this.parseItems(nextProps.items, nextProps.expandedGroups)
            });
        }
    }

    onExpand = ({ key }) => {
        if (this.props.singleExpandable) {
            const newState = Object.keys(this.state.values).reduce((memo, current) => {
                memo[current] = current === key;
                return memo;
            }, {});

            this.setState({
                values: newState
            });
        } else {
            this.setState({
                values: Object.assign({}, this.state.values, {
                    [key]: true
                })
            });
        }
    }

    onCollapse = ({ key }) => {
        this.setState({
            values: Object.assign({}, this.state.values, {
                [key]: false
            })
        });
    }

    parseItems = (items, expandedGroups) => {
        return items.reduce((memo, current) => {
            memo[current.key] = current.key === this.props.initialExpanded || expandedGroups.indexOf(current.key) > -1;
            return memo;
        }, {});
    }

    render() {
        const { className } = this.props;

        return (
            <div className={className}>
                {this.props.items.map(item => (
                    <Accordion
                        key={item.key}
                        accordionKey={item.key}
                        expanded={this.state.values[item.key]}
                        title={item.title}
                        onExpand={this.onExpand}
                        onCollapse={this.onCollapse} >
                        {item.children}
                    </Accordion>
                ))}
            </div>
        );
    }
}