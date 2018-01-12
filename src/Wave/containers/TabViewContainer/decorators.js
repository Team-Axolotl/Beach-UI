import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTab, setActiveTab, editTab } from './actions';

const tab = () => (WrappedComponent) => {
    const Tab = (props) => {
        return (
            <WrappedComponent
                {...props}
                addTab={props.addTab}
                setActiveTab={props.setActiveTab}
                editTab={props.editTab} />
        );
    };

    Tab.propTypes = {
        addTab: PropTypes.func.isRequired,
        setActiveTab: PropTypes.func.isRequired,
        editTab: PropTypes.func.isRequired
    };

    return connect(() => ({}), { addTab, setActiveTab, editTab })(Tab);
};

export default tab;
