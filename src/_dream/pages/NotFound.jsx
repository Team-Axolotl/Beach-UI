import React from 'react';
import PropTypes from 'prop-types';
import Row from '_dream/containers/Row';
import Col from '_dream/containers/Col';

import style from 'style.css';

// The page to display when not found.
export default class NotFound extends React.PureComponent {
    render() {
        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <div className={style.textCenter}>
                            {'The page you are looking for doesn\'t exist.'}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}><div className={style.textCenter}>
                        <a href='#' onClick={(e) => { this.context.router.history.goBack(); e.preventDefault(); return false; }}>
                            {'Click here to go back!'}
                        </a>
                    </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

NotFound.contextTypes = {
    router: PropTypes.object
};
