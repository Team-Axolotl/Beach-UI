import React from 'react';
import PropTypes from 'prop-types';

import Row from '_dream/containers/Row';

import style from 'style.css';

export default class HomePage extends React.Component {
    render() {
        return (
            <Row className={style.padRow} justify='center'>
                {'Home page :P'}
            </Row>
        );
    }
}

HomePage.propTypes = {

};

HomePage.contextTypes = {
    router: PropTypes.object
};
