import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from '_dream/containers/Row';

class Home extends React.Component {
    render() {
        return (
            <Row justify='center' style={{ marginTop: '50px' }}>
                {'this is the home page, there isn\'t anything here really' }
            </Row>
        );
    }
}

Home.propTypes = {

};

export default connect(
    (state, props) => {
        return {

        };
    },
    {

    }
)(Home);
