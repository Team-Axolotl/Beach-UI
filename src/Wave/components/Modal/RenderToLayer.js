import { Component } from 'react';
import PropTypes from 'prop-types';
import {
    unstable_renderSubtreeIntoContainer as unstableRenderSubtreeIntoContainer,
    unmountComponentAtNode
} from 'react-dom';

export default class RenderToLayer extends Component {
    static propTypes = {
        open: PropTypes.bool.isRequired,
        render: PropTypes.func.isRequired,
        containerId: PropTypes.string
    }

    static defaultProps = {
        containerId: 'controls'
    }

    componentDidMount() {
        this.renderLayer();
    }

    componentDidUpdate() {
        this.renderLayer();
    }

    componentWillUnmount() {
        this.unrenderLayer();
    }

    unrenderLayer = () => {
        if (!this.layer) {
            return;
        }

        unmountComponentAtNode(this.layer);

        const container = document.getElementById(this.props.containerId);
        this.layer = null;
        document.body.removeChild(container);
    }

    renderLayer = () => {
        const { open, render, containerId } = this.props;

        if (open) {
            if (!this.layer) {
                this.layer = document.createElement('div');
                this.layer.id = containerId;
                document.body.appendChild(this.layer);
            }

            const layerElement = render();
            this.layerElement = unstableRenderSubtreeIntoContainer(this, layerElement, this.layer);
        } else {
            this.unrenderLayer();
        }
    }

    render() {
        return null;
    }
};