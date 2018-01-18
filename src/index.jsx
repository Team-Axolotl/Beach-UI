import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './style.css';
import 'react-virtualized/styles.css';

import Impl from '_impl';

ReactDOM.render(<Impl />, document.getElementById('root'));
