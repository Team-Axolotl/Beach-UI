import React, { Component } from 'react';
import ModalInternal from './ModalInternal';
import RenderToLayer from './RenderToLayer';
import { propTypes, defaultProps } from './propTypes';

export default class Modal extends Component {
    static propTypes = propTypes;
    static defaultProps = defaultProps;

    renderLayer = () => {
        return <ModalInternal {...this.props} />;
    }

    render() {
        const { id, isOpen } = this.props;

        return (
            <RenderToLayer
                render={this.renderLayer}
                open={isOpen}
                containerId={id} />
        );
    }
}
