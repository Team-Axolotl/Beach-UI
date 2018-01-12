import React from 'react';
import PropTypes from 'prop-types';

import Row from '_dream/containers/Row';

// A container for centering a component within the screen.
export default class ScreenCenterContainer extends React.PureComponent {
    render() {
        return (
            <Row justify='center' alignContent='center' alignItems='center'
              direction='column' style={Object.assign({ height: '100vh', overflow: 'hidden' }, this.props.style)}
              spacing={0}
              className={this.props.className} {...this.props}>
                <div style={{width: '100%'}}>{this.props.children}</div>
            </Row>
        );
    }
}

ScreenCenterContainer.propTypes = {
    children: PropTypes.node,
    // Style inheritance.
    style: PropTypes.object,
    className: PropTypes.string
};
