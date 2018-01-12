import React, { Component } from 'react';
import { propTypes, defaultProps } from './propTypes';

// Extracted in a component to pass it as a prop to the TransitionGroup
// It is a class because a ref to it is needed in ScrollableContainer
export default class Container extends Component {
    static propTypes = propTypes;
    static defaultProps = defaultProps;

    render() {
        const { className, left, children } = this.props;

        return (
             <div style={{ left: `${left}px` }} className={className}>
                { children }
            </div>
        );
    }
}