import React, { Component } from 'react';
import classnames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';
import { tabDecorator } from '../../containers/TabViewContainer';
import { propTypes, defaultProps } from './propTypes';
import styles from './styles.css';

@tabDecorator()
export default class Link extends Component {
    static propTypes = propTypes;
    static defaultProps = defaultProps;

    onClick = (e) => {
        const { id, to, title, shouldAddTab, preventRedirect, addTab, navigationId } = this.props;

        if (preventRedirect) {
            e.preventDefault();
            return;
        }

        if (shouldAddTab) {
            addTab({
                navigationId,
                tab: {
                    id,
                    url: to,
                    title
                }
            });
        }

        this.props.onClick({ id });
    }

    render() {
        const { to, className, children } = this.props;

        return (
            <RouterLink to={to} className={classnames(styles.link, className)} onClick={this.onClick}>
                { children }
            </RouterLink>
        );
    }
}

