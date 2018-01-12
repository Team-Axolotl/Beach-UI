import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Map, fromJS } from 'immutable';

import Button from 'material-ui/Button';
import Modal from 'material-ui/Modal';
import Card from 'material-ui/Card';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';

import ScrollableTabs from './ScrollableTabs/';

import style from './style.css';

export default class Beach extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            dropdownSelection: 1,
            openModal2: false,
            listViewSelections: [1],
            myDropdownSelection: null
        };

        this.items = [
            {id: 1, label: 'Ooo'},
            {id: 2, label: 'Finn', sidenote: 'the Human'},
            {id: 3, label: 'Jake', sidenote: 'the Dog'},
            {id: 4, label: 'Bonnibel', sidenote: 'Bubblegum'},
            {id: 5, label: 'Marceline', sidenote: 'the Vampire Queen'},
            {id: 6, label: 'Simon', sidenote: 'the Ice King'},
            {id: 7, label: 'Susan', sidenote: 'Strong'},
            {id: 8, label: ''},
            {id: 9, label: 'Cake'}
        ];

        this.onDropdownChange = this.onDropdownChange.bind(this);
    }

    onDropdownChange(e) {
        this.setState({ dropdownSelection: e.target.value });
    }

    render() {
        const currentSelectionLabel = this.items.find(i => i.id === this.state.dropdownSelection) || {};

        return <div>
            <section style={{width: '40%', margin: '50px auto', height: '9999px'}}>
                <div style={{margin: '20px 0px'}}>
                    <Select
                      value={this.state.dropdownSelection}
                      onChange={this.onDropdownChange}
                      input={<Input name="adventure-time-character" id="adventure-time-character" />}>
                        <MenuItem value={''}>None</MenuItem>
                        {this.items.map((i, ind) => <MenuItem value={i.id} key={i.id}>{i.label}</MenuItem>)}
                    </Select>
                </div>
                <ScrollableTabs />
            </section>
        </div>;
    }
};

Beach.propTypes = {

};
