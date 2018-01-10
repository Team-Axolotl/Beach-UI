import React from 'react';
import PropTypes from 'prop-types';

// A form component which prevents the default submit behavior and reacts to pressing enter.
export default class FormWrapper extends React.PureComponent {
    constructor(props) {
        super(props);

        this.inputEnterCapture = this.inputEnterCapture.bind(this);
    }

    inputEnterCapture(e) {
        if (e.keyCode === 13) this.props.onEnter();
    }

    render() {
        return (
            <form onSubmit={(e) => { e.preventDefault(); }} onKeyDown={this.inputEnterCapture} style={this.props.style} className={this.props.className} >
                {this.props.children}
            </form>
        );
    }
}

FormWrapper.propTypes = {
    children: PropTypes.node,
    // Style inheritance.
    style: PropTypes.object,
    className: PropTypes.string,
    // The function to execute on pressing enter.
    onEnter: PropTypes.func
};
