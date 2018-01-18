import React from 'react';
import { getModule } from '_standard/dynamicImport';

export default class LazyLoaderComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.loadModule = this.loadModule.bind(this);
        this.state = {
            component: null
        };
    }

    loadModule(moduleNmae) {
        return getModule(moduleNmae)
        .then(cacheComponent => this.setState({component: cacheComponent}))
        .catch(cacheComponent => this.setState({component: null}));
    }

    componentWillReceiveProps(newProps) {
        if (newProps.componentName) {
            return this.loadModule(newProps.componentName);
        }
    }

    componentWillMount() {
        if (this.props.componentName) {
            return this.loadModule(this.props.componentName);
        }
    }

    componentWillUnmount() {
        this.state = {
            component: null
        };
    }

    render() {
        const Component = this.state.component;

        if (Component) {
            return <Component />;
        } else {
            return <div />;
        }
    }
};
