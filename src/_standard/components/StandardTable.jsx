import React from 'react';
import PropTypes from 'prop-types';

import { List } from 'immutable';
import { Table, AutoSizer } from 'react-virtualized';

import { CircularProgress } from 'material-ui';

export default class StandardTable extends React.Component {
    constructor(props) {
        super(props);

        this.rowGetter = this.rowGetter.bind(this);
    }

    rowGetter({ index }) {
       return this.props.data.get(index);
    }

    render() {
        let { children, rowGetter, ...other } = this.props;

        return (
            <div style={this.props.wrapperStyle ? this.props.wrapperStyle : { width: '100%', height: '600px' }}>
                <AutoSizer>
                    {({ height, width }) => (
                        <Table
                          {...other}
                          height={height}
                          width={width}
                          rowCount={this.props.data.size}
                          rowGetter={rowGetter || this.rowGetter}
                        >
                            {children}
                        </Table>
                    )}
                </AutoSizer>
            </div>
        );
    }
}

StandardTable.propTypes = {
    children: PropTypes.node,
    data: PropTypes.instanceOf(List).isRequired,
    wrapperStyle: PropTypes.object,
    rowGetter: PropTypes.func
};

StandardTable.defaultProps = {
    headerRenderer: (data) => { return <div>{data.label}</div>; },
    headerHeight: 40,
    rowHeight: 46,
    noRowsRenderer: () => <div style={{ position: 'absolute', left: '45%', top: '45%' }} ><CircularProgress size={100} thickness={3} color={'primary'} /></div>
};
