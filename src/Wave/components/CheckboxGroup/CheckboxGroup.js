import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Checkbox from '../Checkbox';

import styles from './styles.css';

export default class CheckboxGroup extends Component {
    static propTypes = {
        options: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            className: PropTypes.string,
            disabled: PropTypes.bool
        })).isRequired,
        selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        type: PropTypes.oneOf(['horizontal', 'vertical']),
        label: PropTypes.string,
        className: PropTypes.string,
        aligned: PropTypes.bool,
        onChange: PropTypes.func.isRequired
    }

    static defaultProps = {
        type: 'horizontal',
        label: '',
        className: '',
        aligned: false
    }

    onClick = ({ id, label, value, params }) => {
        this.props.onChange({ id, label, value, params });
    }

    get checkboxes() {
        const { options, selectedId } = this.props;

        return options.map((item) => {
            const { id, disabled, label, value, className, params } = item;

            return (
                <Checkbox
                    key={id}
                    id={id}
                    className={classnames(styles.checkboxContainer, className)}
                    disabled={disabled}
                    checked={selectedId === id}
                    label={label}
                    value={value}
                    params={params}
                    onClick={this.onClick}
                />
            );
        });
    }

    get classes() {
        const { type, aligned, className } = this.props;

        return {
            container: classnames(styles.groupContainer, styles[type], className, {
                [styles.aligned]: aligned
            }),
            label: styles.groupLabel,
            itemsContainer: styles.itemsContainer
        };
    }

    render() {
        const { label } = this.props;

        return (
            <div className={this.classes.container}>
                <div className={this.classes.label}>{ label }</div>
                <div className={this.classes.itemsContainer}>{ this.checkboxes }</div>
            </div>
        );
    }
}
