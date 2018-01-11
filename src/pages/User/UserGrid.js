import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { List, Map } from 'immutable';
import { Column, Table, AutoSizer, defaultCellRenderer } from 'react-virtualized';
import classnames from 'classnames';

import { getRowClassName } from '../../components/Table/helpers/defaults';
import { configToColumns } from '../../components/Table/helpers';
import utTableStyle from '../../components/Table/helpers/style.css';
import Pagination from '../../components/Pagination';
import Center from '../../components/Center';

import { fetchUsers } from './actions';

import config from './config';

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.onPaginationChange = this.onPaginationChange.bind(this);
        // Create Column elements from the config
        this.columns = configToColumns(config);
        // React-virtualized bindings
        this.rowGetter = this.rowGetter.bind(this);
    }
    componentDidMount() {
        const { data, fetchUsers } = this.props;
        if (!data.size) {
            fetchUsers();
        }
    }
    rowGetter({ index }) {
        return this.props.data.get(index);
    }
    onPaginationChange(pagination) {
        const { fetchUsers } = this.props;
        fetchUsers({
            pageNumber: pagination.get('pageNumber'),
            pageSize: pagination.get('pageSize')
        });
    }
    render() {
        const { data, pagination } = this.props;
        return (
            <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}} >
                <div style={{flexBasis: '240px', flexGrow: 1}}>
                    <AutoSizer>
                        {({ height, width }) => (
                            <Table
                                width={width}
                                height={height}
                                headerHeight={48}
                                headerClassName={utTableStyle.tableHeader}
                                gridClassName={utTableStyle.tableGrid}
                                rowCount={data.size}
                                rowHeight={46}
                                rowGetter={this.rowGetter}
                                rowClassName={getRowClassName}
                                noRowsRenderer={() => <Center>No data</Center>}
                            >
                                {this.columns}
                            </Table>
                        )}
                    </AutoSizer>
                </div>
                <Pagination pagination={pagination} onPaginationChange={this.onPaginationChange} />
            </div>
        );
    }
}

Grid.propTypes = {
    data: PropTypes.instanceOf(List).isRequired,
    pagination: PropTypes.instanceOf(Map),
    // Actions
    fetchUsers: PropTypes.func
};

Grid.defaultProps = {
    data: new List()
};

export default connect(state => {
    return ({
        data: state.utUser.get('users'),
        pagination: state.utUser.get('pagination'),
    });
},{
    fetchUsers
})(Grid);
