import React from 'react';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import { Tab } from 'material-ui/Tabs';

import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import grey from 'material-ui/colors/grey';

import GeneralInfo from './GeneralInfo/';

import StandardTabs from '_standard/components/StandardTabs';

const tabsTheme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: blue,
        text: grey.contrastDefaultColor
    }
});

export default class ScrollableTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
        <MuiThemeProvider theme={tabsTheme}>
            <AppBar position='static' color='default'>
                <StandardTabs
                  classes={classes}
                  value={value}
                  onChange={this.handleChange}
                  textColor='primary'
                  scrollable
                  scrollButtons='auto'
                >
                    <Tab disableRipple label='General info' />
                    <Tab disableRipple label='Contact info' />
                    <Tab disableRipple label='Assigned roles' />
                    <Tab disableRipple label='Credentials' />
                    <Tab disableRipple label='External credentials' />
                    <Tab disableRipple label='Business unit management' />
                    <Tab disableRipple label='Access policy' />
                </StandardTabs>
            </AppBar>
            {value === 0 && <GeneralInfo />}
            {value === 1 && <div>Contact info</div>}
            {value === 2 && <div>Assigned roles</div>}
            {value === 3 && <div>Credentials</div>}
            {value === 4 && <div>External credentials</div>}
            {value === 5 && <div>Business unit management</div>}
            {value === 6 && <div>Access policy</div>}
      </MuiThemeProvider>
    );
  }
};

ScrollableTabs.propTypes = {
    classes: PropTypes.object
};
