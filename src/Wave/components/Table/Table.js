import React, { Component } from 'react';
import classnames from 'classnames';
import { propTypes, defaultProps } from './propTypes';

import styles from './styles.css';

export default class Table extends Component {
    static propTypes = propTypes;
    static defaultProps = defaultProps;

    constructor() {
        super();
        this.state = {};
    }

    renderHeader = () => {
        const { columns } = this.props;

        return (
            <div className={styles.header}>
                {columns.map(column => (
                    <div
                        className={classnames(styles.column, styles.cell)}
                        key={`table-header-${Math.random()}`}>
                        {column.header}
                    </div>
                ))}
            </div>
        );
    }

    renderBody = () => {
        const { data, columns } = this.props;

        return (
            <div className={styles.body}>
                {data.map(row => (
                    <div
                        key={`table-row-${Math.random()}`}
                        className={styles.row}>
                        {columns.map(column => (
                            <span
                                key={`table-cell-${Math.random()}`}
                                className={styles.cell}>
                                {column.content ? column.content(row) : row[column.name]}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        );
    }

    render() {
        return (
            <div className={styles.table}>
                {this.renderHeader()}
                {this.renderBody()}
            </div>
        );
    }
}
