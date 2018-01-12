import React, { Component } from 'react';
import classnames from 'classnames';
import { propTypes, defaultProps } from './propTypes';
import styles from './styles.css';

export default class RadioButton extends Component {
    static propTypes = propTypes;
    static defaultProps = defaultProps;

    onClick = () => {
        const { id, label, selected } = this.props;

        this.props.onClick({
            id,
            value: label.text || label,
            selected: !selected
        });
    }

    render() {
        const {
            className,
            id,
            label,
            selected,
            disabled
        } = this.props;

        return (
            <div className={classnames(styles.radioButtonContainer, className, [styles.disabled]: disabled)} onClick={this.onClick}>
                <div className={classnames(styles.radioButton, selected && styles.on)} data-id={id}>
                    { selected && <div className={styles.radioButtonHandle} />}
                </div>
                <span className={classnames(styles.radioButtonLabel, label.className)}>{ label.text || label }</span>
            </div>
        );
    }
}