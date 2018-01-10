import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';

import Row from '_dream/containers/Row';
import Col from '_dream/containers/Col';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import style from './tableStyles.css';

import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel
} from 'material-ui/Table';

class SearchTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const tableHeaders = ['First Name', 'Last Name', 'Customer Number', 'ID Number', 'Phone Number', 'Address'];
        const tableFields = ['firstName', 'lastName', 'customerNumber', 'documentNumber', 'phoneNumber', 'address'];

        return (
            <div className={style.tableContainer}>
                {this.props.results.map((customer, index) => (
                    <Card key={index}>
                        <CardMedia
                            className={style.resultImage}
                            image={'http://localhost:8003/s/ut-document/repository/' + customer.get('fileName')}
                        />
                        <Typography type='headline' component='h2'>
                            {customer.get('firstName') + ' ' + customer.get('lastName')}
                        </Typography>
                    </Card>
                ))}
            </div>
        );
    }
}

SearchTable.propTypes = {
    results: PropTypes.instanceOf(List)
};

SearchTable.contextTypes = {

};

export default connect(
    (state, props) => {
        return {
            results: state.Customer.getIn(['searchResults', 'customer'], new List())
        };
    },
    {

    }
)(SearchTable);
