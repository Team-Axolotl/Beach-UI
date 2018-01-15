import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Home extends React.Component {
    render() {
        return (
            <div style={{ marginTop: '50px' }}>
                {'this is the home page, there isn\'t anything here really' }
            </div>
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
