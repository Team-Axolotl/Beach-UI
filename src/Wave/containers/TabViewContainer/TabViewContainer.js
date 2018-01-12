import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
    initNavigation,
    removeTab,
    setActiveTab
} from './actions';
import TabView from '../../components/TabView';

class TabContainer extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        navigationId: PropTypes.string.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        type: PropTypes.oneOf(['tab', 'pill', 'inlinePill']),
        items: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            title: PropTypes.string,
            url: PropTypes.string
        })),
        tabs: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            title: PropTypes.string,
            url: PropTypes.string
        })),
        activeTab: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            title: PropTypes.string,
            url: PropTypes.string
        }),
        preserveActiveTabOnRefresh: PropTypes.bool,
        validate: PropTypes.bool,
        activeIndex: PropTypes.number,
        validateOnTabChange: PropTypes.bool,
        errors: PropTypes.object,
        animated: PropTypes.bool,
        initNavigation: PropTypes.func.isRequired,
        removeTab: PropTypes.func.isRequired,
        setActiveTab: PropTypes.func.isRequired,
        onTabChange: PropTypes.func,
        onTabClose: PropTypes.func
    };

    static defaultProps = {
        type: 'tab',
        items: [],
        tabs: [],
        activeTab: {},
        preserveActiveTabOnRefresh: true,
        validate: false,
        activeIndex: null,
        validateOnTabChange: false,
        errors: {},
        animated: true,
        onTabChange: () => {},
        onTabClose: () => {}
    }

    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        const { id, items, validate, location, preserveActiveTabOnRefresh } = this.props;

        this.props.initNavigation({
            id,
            items,
            validateOnTabChange: validate,
            activeTabUrl: preserveActiveTabOnRefresh ? location.pathname : ''
        });
    }

    componentWillReceiveProps(nextProps) {
        const { activeTab, history } = this.props;

        if (activeTab.url !== nextProps.activeTab.url) {
            history.push(nextProps.activeTab.url);
        }
    }

    onClick({ id, url }) {
        const { navigationId, errors, onTabChange } = this.props;

        this.props.setActiveTab({ navigationId, url, errors });
        onTabChange({ navigationId, id, url });
    }

    onClose = ({ id, url }) => {
        const { navigationId, onTabClose } = this.props;

        this.props.removeTab({ navigationId, url });
        onTabClose({ id });
    }

    render() {
        const { tabs, activeTab, activeIndex, validateOnTabChange, animated, type, errors } = this.props;

        return (
            <TabView
                type={type}
                items={tabs}
                active={activeTab}
                activeIndex={activeIndex}
                animated={animated}
                validateOnTabChange={validateOnTabChange}
                errors={errors}
                onClick={this.onClick}
                onClose={this.onClose} />
        );
    }
}

export default withRouter(connect(({ navigation }, props) => {
    const tabs = navigation.getIn([props.id, 'tabs']);
    const activeTab = navigation.getIn([props.id, 'activeTab']);

    return {
        navigationId: props.id,
        tabs: tabs && tabs.toJS(),
        activeTab: activeTab && activeTab.toJS(),
        activeIndex: navigation.getIn([props.id, 'activeTabIndex']),
        validateOnTabChange: navigation.getIn([props.id, 'validateOnTabChange'])
    };
}, {
    initNavigation,
    removeTab,
    setActiveTab
})(TabContainer));
