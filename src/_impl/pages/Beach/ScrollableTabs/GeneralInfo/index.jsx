import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Typography from 'material-ui/Typography';

import { withTheme } from 'material-ui/styles';
import { createMuiTheme } from 'material-ui/styles';
import indigo from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import grey from 'material-ui/colors/grey';

import style from './style.css';

const ScrollableTabsTheme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: green,
    textColor: grey
  }
});

function GeneralInfo(props) {
    return (
      <div>
        <Typography type='subheading' gutterBottom className={style.tabTitleRow}>
            General Info
        </Typography>
        <TextField label='firstName' className={style.textField} />
        <Input label='lastName' className={style.textField} />
        <FormControl className={style.formControl}>
          <InputLabel htmlFor='name-simple'>Your Name:</InputLabel>
          <Input id='name-simple' className={style.textField} />
        </FormControl>
        <div className={style.formBody}>
        <FormControl className={style.formControl}>
          <Typography type='body1'>Your Name: </Typography>
          <Input id='name-simple' className={style.textField} />
        </FormControl>
        <FormControl className={style.formControl}>
          <Typography type='body1'>Your Name: </Typography>
          <Input id='name-simple' className={style.textField} />
        </FormControl>
        </div>
      </div>
    );
}

export default withTheme(ScrollableTabsTheme)(GeneralInfo);
