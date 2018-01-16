import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { List, Map } from 'immutable';
import { Table, AutoSizer, Column } from 'react-virtualized';

import Row from '_dream/containers/Row';
import Col from '_dream/containers/Col';

import { fetchUsers } from '_impl/logic/User/actions';

import { CircularProgress } from 'material-ui';

class Grid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cache: []
        };

        this.rowGetter = this.rowGetter.bind(this);
        this.cellRenderer = this.cellRenderer.bind(this);
        this.rowRenderer = this.rowRenderer.bind(this);
    }

    componentDidMount() {
        if (!this.props.data.size) {
            this.props.fetchUsers();
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

    cellRenderer(data, a, b, c) {
        debugger;
    }

    rowRenderer(data, a, b, c) {
        debugger;
    }

    render() {
        return (
            <div style={{ marginTop: '50px' }}>
                <Row justify='center' >
                    <Col md={10} xs={12}>
                    <div style={{ width: '100%', height: '600px' }}>
                        <AutoSizer>
                            {({ height, width }) => (
                                <Table
                                  cellDataGetter={this.cellRenderer}
                                  headerHeight={40}
                                  height={height}
                                  width={width}
                                  rowCount={this.props.data.size}
                                  rowGetter={this.rowGetter}
                                  rowHeight={46}
                                  noRowsRenderer={() => <div style={{ position: 'absolute', left: '45%', top: '45%' }} ><CircularProgress size={100} thickness={3} color={'primary'} /></div>}
                                  sortBy={'userName'}
                                >
                                    <Column dataKey={'userName'} label={'Username'} width={100} flexGrow={1} />
                                    <Column dataKey={'firstName'} label={'First Name'} width={100} flexGrow={1} />
                                    <Column dataKey={'lastName'} label={'Last Name'} width={100} flexGrow={1} />
                                    <Column dataKey={'branches'} label={'Branch'} width={100} flexGrow={1} />
                                    <Column dataKey={'statusId'} label={'Status'} width={100} flexGrow={1} />
                                </Table>
                            )}
                        </AutoSizer>
                        </div>
                    </Col>
                </Row>
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

export default connect(
    (state, props) => {
        return {
            data: state.User.get('users', new List())
        };
    },
    {
        fetchUsers
    }
)(Grid);
