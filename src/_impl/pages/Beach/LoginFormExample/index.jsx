import React from 'react';
import PropTypes from 'prop-types';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { Button, Input } from 'material-ui'

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        backgroundColor: '#E70276',
        borderRadius:2,
        border: 0,
        height: 46,
        padding: '0 110px',
        width:'100%',
        textTransform: 'uppercase',
        fontFamily: 'OpenSans',
        fontSize: '14px',
        color: '#FFF',
        fontWeight: '600',
        '&:hover': {
          backgroundColor: '#C06'
        },
      }
    },
    MuiInput: {
      root: {
        width:'100%',
        marginBottom: '10px'
      },
      input: {
        border: '1px solid #AFB3B4',
        padding: 14,
        borderRadius:0,
        '&:focus': {
          border: '1px solid #E3006B'
        },
        lineHeight: 'inherit',
        fontSize: 14
      },
      underline: {
        '&:before': {
            backgroundColor: 'none',
         },
        '&:hover:not($disabled):before': {
            backgroundColor: 'none'
        }
      },
      inkbar: {
        '&:after': {
           backgroundColor: 'none'
        }
      }
    }
  }
});

export default class LoginFormExample extends React.Component {
    render() {
        return (
            <div>
                <section style={{width: '40%', margin: '100px auto'}}>
                    <MuiThemeProvider theme={theme}>
                        <div>
                            <div style={{paddingBottom: '10px'}}>
                                <Input placeholder={'Username'}/>
                                <Button disableRipple  >Next</Button>
                            </div>
                        </div>
                    </MuiThemeProvider>
                    <div style={{marginTop: '100px'}}>
                        <Input placeholder={'Username'}/>
                    </div>
                    <Button style={{marginTop: '10px'}} primary raised>Next</Button>
                </section>
        </div>
        );
    }
};
