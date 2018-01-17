import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import implementationStyle from './styles/index';
import StandardButton from '_standard/components/StandardButton';

export default class StyleProvider extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            implStyle: true
        };
        this.toggleImplStyle = this.toggleImplStyle.bind(this);
        this.customButtonStyle = {
            root: {
                display: 'flex',
                justifyContent: 'center',
                verticalAlign: 'middle',
                alignItems: 'center',

                borderRadius: 5,
                border: '1px solid',

                textTransform: 'capitalize',
                transition: '',
                fontSize: '15px',

                color: '#FFFFFF',
                borderColor: '##c14431',
                backgroundColor: '#e06231',

                '&:hover': {
                    color: '#FFFFFF',
                    backgroundColor: '#e06231'
                },

                '&:active': {
                    borderColor: '#444444'
                }
            }
        };
    }

    getChildContext() {
        return {
            implementationStyle: this.state.implStyle ? implementationStyle : undefined
        };
    }

    toggleImplStyle() {
        this.setState({ implStyle: !this.state.implStyle });
    }

    render() {
        let { children } = this.props;
        return (
        <span>
            {children}
            <StandardButton onClick={this.toggleImplStyle} styleType='custom' customStyle={this.customButtonStyle}>
                Toggle Implementation Style
            </StandardButton>
        </span>);
    }
}

StyleProvider.childContextTypes = {
    implementationStyle: PropTypes.object
};

StyleProvider.propTypes = {
    children: PropTypes.node
};
