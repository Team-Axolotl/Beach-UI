import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { List } from 'immutable';
import { Column } from 'react-virtualized';

import Row from '_dream/containers/Row';
import Col from '_dream/containers/Col';

import { fetchUsers } from '_impl/logic/User/actions';

import StandardTable from '_standard/components/StandardTable';

class Grid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cache: []
        };
    }

    componentDidMount() {
        if (!this.props.data.size) {
            this.props.fetchUsers();
        }
    }
    onPaginationChange(pagination) {
        const { fetchUsers } = this.props;
        fetchUsers({
            pageNumber: pagination.get('pageNumber'),
            pageSize: pagination.get('pageSize')
        });
    }

    render() {
        return (
            <div style={{ marginTop: '50px' }}>
                <Row justify='center' >
                    <Col md={10} xs={12}>
                        <StandardTable sortBy={'userName'} data={this.props.data} >
                            <Column headerRenderer={this.headerRenderer} dataKey={'userName'} label={'Username'} width={100} flexGrow={1} />
                            <Column headerRenderer={this.headerRenderer} dataKey={'firstName'} label={'First Name'} width={100} flexGrow={1} />
                            <Column headerRenderer={this.headerRenderer} dataKey={'lastName'} label={'Last Name'} width={100} flexGrow={1} />
                            <Column headerRenderer={this.headerRenderer} dataKey={'branches'} label={'Branch'} width={100} flexGrow={1} />
                            <Column headerRenderer={this.headerRenderer} dataKey={'statusId'} label={'Status'} width={100} flexGrow={1} />
                        </StandardTable>
                    </Col>
                </Row>
            </div>
        );
    }
}

Grid.propTypes = {
    data: PropTypes.instanceOf(List).isRequired,
    // Actions
    fetchUsers: PropTypes.func
};

Grid.contextTypes = {
    implementationStyle: PropTypes.object
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
