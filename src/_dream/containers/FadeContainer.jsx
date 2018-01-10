import React from 'react';
import PropTypes from 'prop-types';

// A DOM fader.
export default class Fader extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            render: props.visible
        };

        this.timeoutId = 0;
    }

    componentWillReceiveProps(newProps) {
        // Check if any changes have occured.
        if (newProps.visible === this.props.visible) return;
        // Clear previous timeouts.
        clearTimeout(this.timeoutId);
        // Decide action based on new visiblity.
        if (!newProps.visible) {
            this.timeoutId = setTimeout(() => { this.setState({render: false}); }, this.props.time);
        } else if (newProps.visible) {
            this.setState({render: true});
        }
    }

    render() {
        return (
            <div style={
                {
                    opacity: this.props.visible ? 1 : 0,
                    transition: 'opacity ' + this.props.time + 'ms',
                    transitionTimingFunction: 'linear'
                }
            }>
                {this.state.render ? this.props.children : null}
            </div>
        );
    }
}

Fader.propTypes = {
    children: PropTypes.node,
    // Whether to render the component.
    visible: PropTypes.bool,
    // The time to take in fading the component.
    time: PropTypes.number
};

Fader.defaultProps = {
    time: 500
};
