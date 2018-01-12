import React from 'react';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import indigo from 'material-ui/colors/indigo';
import lime from 'material-ui/colors/lime';
import grey from 'material-ui/colors/grey';

import GeneralInfo from './GeneralInfo/';

const tabsTheme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: lime,
        text: grey
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
                <Tabs
                  classes={classes}
                  value={value}
                  onChange={this.handleChange}
                  indicatorColor='primary'
                  textColor='primary'
                  scrollable
                  scrollButtons='auto'
                  disableRipple
                >
                    <Tab disableRipple label='General info' />
                    <Tab label='Contact info' />
                    <Tab label='Assigned roles' />
                    <Tab label='Credentials' />
                    <Tab label='External credentials' />
                    <Tab label='Business unit management' />
                    <Tab label='Access policy' />
                </Tabs>
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