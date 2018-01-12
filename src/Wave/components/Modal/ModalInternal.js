import React, { Component } from 'react';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import Header from './Header';
import Footer from './Footer';
import Overlay from '../Overlay';
import {
    POPUP_MIN_OFFSETS,
    POPUP_HEADER_HEIGHT,
    POPUP_FOOTER_HEIGHT,
    POPUP_MIN_SIDE_OFFSETS
} from './config';
import { propTypes, defaultProps } from './propTypes';

import styles from './styles.css';

export default class ModalInternal extends Component {
    static propTypes = propTypes;
    static defaultProps = defaultProps;

    constructor() {
        super();

        this.state = {
            contentMaxHeight: '',
            contentMaxWidth: ''
        };

        this.handleWindowResize = debounce(this.handleWindowResize.bind(this), 100);
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentDidMount() {
        if (this.props.closeOnEsc) {
            document.addEventListener('keydown', this.handleEsc);
        }
        this.updateContentDimensions();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleEsc);
        window.removeEventListener('resize', this.handleWindowResize);
    }

    get contentWidth() {
        const { contentMaxWidth } = this.state;

        let style = {
            maxWidth: contentMaxWidth
        };

        if (this.props.fullWidth) {
            style = Object.assign({}, style, { minWidth: contentMaxWidth });
        }

        return style;
    }

    handleWindowResize() {
        this.updateContentDimensions();
    }

    updateContentDimensions = () => {
        const contentMaxHeight = window.innerHeight - POPUP_MIN_OFFSETS - POPUP_HEADER_HEIGHT - POPUP_FOOTER_HEIGHT;
        const contentMaxWidth = window.innerWidth - POPUP_MIN_SIDE_OFFSETS;

        this.setState({
            contentMaxWidth: `${contentMaxWidth}px`,
            contentMaxHeight: `${contentMaxHeight}px`
        });
    }

    handleEsc = ({ keyCode }) => {
        const { close } = this.props;

        if (keyCode === 27) {
            close();
        }
    }

    render() {
        const {
            className,
            contentClassName,
            hasOverlay,
            closeOnOverlayClick,
            header,
            footer,
            children,
            close
        } = this.props;

        return (
            <div className={styles.modalContainer}>
                { hasOverlay && <Overlay onClick={closeOnOverlayClick ? close : null} /> }
                <div style={this.contentWidth} className={classnames(styles.popupContainer, className)}>
                    { header && <Header className={header.className} text={header.text} close={close} closeIcon={header.closeIcon} /> }
                    <div style={{ maxHeight: this.state.contentMaxHeight }} className={classnames(styles.popupContent, contentClassName)}>
                        { children }
                    </div>
                    { footer && <Footer leftNode={footer.leftNode} className={footer.className} actionButtons={footer.actionButtons} /> }
                </div>
            </div>
        );
    }
}