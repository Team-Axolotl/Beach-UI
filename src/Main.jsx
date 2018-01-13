import React from 'react';
import PropTypes from 'prop-types';

import Row from '_dream/containers/Row';

import style from 'style.css';

export default class Main extends React.Component {
    render() {
        return (
            <Row className={style.padRow} justify='center'>
                {'~*~* Dream-Beach Demo *~*~*'}
            </Row>
        );
    }
}

Main.propTypes = {

};

Main.contextTypes = {
    router: PropTypes.object
};
