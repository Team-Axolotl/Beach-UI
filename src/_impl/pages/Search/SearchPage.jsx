import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import style from 'style.css';

import Row from '_dream/containers/Row';
import Col from '_dream/containers/Col';
import FormContainer from '_dream/containers/FormContainer';
import ScreenCenterContainer from '_dream/containers/ScreenCenterContainer';
import SquareInput from '_dream/components/SquareInput';

import { CircularProgress } from 'material-ui';

import SearchTable from './SearchTable';

import { Search } from '_impl/logic/Customer/actions';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchInput: '',
            searchPage: 1,
            loading: false
        };
    }

    render() {
        return (
            <ScreenCenterContainer>
                <Row justify='center'>
                    <Col md={5}>
                        <FormContainer onEnter={() => {
                            this.setState({loading: true});

                            return this.props.Search(this.state.searchInput, this.state.searchPage).then((result) => {
                                this.setState({loading: false});
                                return false;
                            });
                        }}>
                            <SquareInput autoFocus fullWidth
                              onChange={(e) => this.setState({ searchInput: e.target.value })}
                              value={this.state.searchInput}
                              placeholder={'Search'} />
                        </FormContainer>
                        {this.state.loading && <CircularProgress size={100} thickness={3} className={style.absoluteCenter} />}
                    </Col>
                </Row>
                <Row style={{margin: '1vh'}} />
                <Row justify='center'>
                    <Col md={10}>
                        <SearchTable />
                    </Col>
                </Row>
            </ScreenCenterContainer>
        );
    }
}

SearchPage.propTypes = {
    Search: PropTypes.func
};

SearchPage.contextTypes = {
    router: PropTypes.object
};

export default connect(
    (state, props) => {
        return {

        };
    },
    {
        Search
    }
)(SearchPage);
