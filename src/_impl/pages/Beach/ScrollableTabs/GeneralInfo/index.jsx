import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Typography from 'material-ui/Typography';

import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import indigo from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import grey from 'material-ui/colors/grey';

import Row from '_dream/containers/Row';
import Col from '_dream/containers/Col';

import style from './style.css';

const GeneralInfoTheme = createMuiTheme({
    overrides: {
        MuiTypography: {
            root: {
                width:'100%',
                padding: '5px 25px',
                marginBottom: '10px'
            }
        },
        MuiInput: {
            root: {
                width:'100%',
                marginBottom: '10px'
            },
            input: {
                border: '1px solid #AFB3B4',
                padding: 5,
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
        },
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
        }
    }
  });

export default function GeneralInfo(props) {
    return (
        <div style={{border: '1px solid #CCCCCC', padding: '10px'}}>
            <MuiThemeProvider theme={GeneralInfoTheme}>
                <Typography type='subheading' className={style.tabTitleRow}>
                    General Info
                </Typography>
                <Col>
                    <Row className={style.row}>
                        <Col md={4}>
                            <Typography type='body1'>First Name*: </Typography>
                        </Col>
                        <Col md={8}>
                            <Input placeholder={'First Name'}/>
                        </Col>
                    </Row>
                    <Row className={style.row}>
                        <Col md={4}>
                            <Typography type='body1'>Last Name*: </Typography>
                        </Col>
                        <Col md={8}>
                            <Input placeholder={'Last Name'}/>
                        </Col>
                    </Row>
                    <Row className={style.row}>
                        <Col md={4}>
                            <Typography type='body1'>Phone Model: </Typography>
                        </Col>
                        <Col md={8}>
                            <Input placeholder={'Phone Model'}/>
                        </Col>
                    </Row>
                </Col>
            </MuiThemeProvider>
        </div>
    );
}

//export default withTheme(GeneralInfoTheme)(GeneralInfo);
