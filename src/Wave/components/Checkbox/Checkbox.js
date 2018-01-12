import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';

import styles from './styles.css';

export default class Checkbox extends Component {
    static propTypes = {
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        className: PropTypes.string,
        leftLabel: PropTypes.string,
        label: PropTypes.string,
        labelClassName: PropTypes.string,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        params: PropTypes.object,
        borderBottom: PropTypes.bool,
        aligned: PropTypes.bool,
        onClick: PropTypes.func
    };
    static defaultProps = {
        className: '',
        leftLabel: '',
        label: '',
        labelClassName: '',
        checked: false,
        disabled: false,
        value: '',
        params: {},
        borderBottom: false,
        aligned: false,
        onClick: () => {}
    }

    onClick = () => {
        const { id, value, label, leftLabel, params } = this.props;

        this.props.onClick({
            id,
            value,
            label: label || leftLabel,
            params
        });
    }

    get classes() {
        const { className, labelClassName, checked, disabled, leftLabel, borderBottom, aligned } = this.props;

        return {
            container: classnames(styles.checkboxContainer, className, {
                [styles.borderBottom]: borderBottom
            }),
            iconContainer: classnames(styles.checkbox, {
                [styles.checked]: checked,
                [styles.disabled]: disabled
            }),
            label: classnames(styles.checkboxLabel, labelClassName, {
                [styles.disabled]: disabled,
                [styles.leftLabel]: leftLabel,
                [styles.aligned]: aligned
            })
        };
    }

    render() {
        const { leftLabel, label, disabled } = this.props;

        return (
            <div className={this.classes.container} onClick={disabled ? null : this.onClick}>
                { leftLabel && <span className={this.classes.label}>{ leftLabel } </span> }
                <span className={this.classes.iconContainer}>
                    <Icon glyph='checkbox_check' />
                </span>
                { label && <span className={this.classes.label}>{ label } </span> }
            </div>
        );
    }
}
