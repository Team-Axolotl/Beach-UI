import React from 'react';
import PropTypes from 'prop-types';
import { Column } from 'react-virtualized';

/** Property for {Column.cellDataGetter} which nadles immutable(or Map-like) rows */
export function immutableCellDataGetter({columnData, dataKey, rowData}) {
    return Array.isArray(dataKey) ? rowData.getIn(dataKey) : rowData.get(dataKey);
}

export function configToColumns(config = {}) {
    return Object.keys(config).map(columnConfig => {
        return (
            <Column
              {...config[columnConfig]}
              dataKey={config[columnConfig].dataKey || columnConfig}
              key={columnConfig}
              cellDataGetter={config[columnConfig].cellDataGetter || immutableCellDataGetter}
            />
        );
    });
}
