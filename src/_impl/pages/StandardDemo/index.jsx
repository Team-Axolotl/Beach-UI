import React from 'react';
import PropTypes from 'prop-types';

import Row from '_dream/containers/Row';
import Col from '_dream/containers/Col';

import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';

import Delete from 'material-ui-icons/Delete';
import ArrowRight from 'material-ui-icons/KeyboardArrowRight';
import ArrowLeft from 'material-ui-icons/KeyboardArrowLeft';

import StandardButton from '_standard/components/StandardButton';
import StandardInput from '_standard/components/StandardInput';
import StandardDropdown from '_standard/components/StandardDropdown';
import StandardTabs from '_standard/components/StandardTabs';
import StandardTab from '_standard/components/StandardTab';

import style from 'style.css';

const MicrocredCustomStyledButton = {
    root: {
        backgroundColor: '#E70276',
        borderRadius: 2,
        border: 0,
        height: 46,
        textTransform: 'uppercase',
        fontFamily: 'Roboto',
        fontSize: '13px',
        color: '#FFF',
        fontWeight: '600',
        '&:hover': {
          backgroundColor: '#C06'
        }
    }
};

export default class StandardDemo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textValue: '',
            selectedDropdownItem: undefined,
            selectedTab: 0
        };

        this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleDropdownSelect(event) {
        this.setState({ selectedDropdownItem: event.target.value });
    }

    handleTabChange(event, value) {
        this.setState({ selectedTab: value });
    }

    render() {
        return (
            <div style={{marginTop: '20px'}}>
                <Row className={style.padRow} justify='center'>
                    <Col md={1}>
                        <StandardButton>
                            {'Clicky'}
                        </StandardButton>
                    </Col>
                    <Col md={1}>
                        <StandardButton disabled>
                            {'No-Clicky'}
                        </StandardButton>
                    </Col>
                    <Col md={1}>
                        <StandardButton>
                            <Delete />
                            {'Delete'}
                        </StandardButton>
                    </Col>
                </Row>
                <Row className={style.padRow} justify='center'>
                    <Col md={1}>
                        <StandardButton styleType={'white'}>
                            {'Clicky'}
                        </StandardButton>
                    </Col>
                    <Col md={1}>
                        <StandardButton styleType={'white'} disabled>
                            {'No-Clicky'}
                        </StandardButton>
                    </Col>
                    <Col md={1}>
                        <StandardButton styleType={'white'}>
                            <Delete />
                            {'Delete'}
                        </StandardButton>
                    </Col>
                </Row>
                <Row className={style.padRow} justify='center'>
                    <Col md={1}>
                        <StandardButton styleType={'blue'}>
                            {'Clicky'}
                        </StandardButton>
                    </Col>
                    <Col md={1}>
                        <StandardButton styleType={'blue'} disabled>
                            {'No-Clicky'}
                        </StandardButton>
                    </Col>
                    <Col md={1}>
                        <StandardButton styleType={'blue'}>
                            <Delete />
                            {'Delete'}
                        </StandardButton>
                    </Col>
                </Row>
                <Row className={style.padRow} justify='center'>
                    <Col md={1}>
                        <StandardButton styleType={'label'}>
                            {'Clicky'}
                        </StandardButton>
                    </Col>
                    <Col md={1}>
                        <StandardButton styleType={'label'} disabled>
                            {'No-Clicky'}
                        </StandardButton>
                    </Col>
                    <Col md={1}>
                        <StandardButton styleType={'label'}>
                            <Delete />
                            {'Delete'}
                        </StandardButton>
                    </Col>
                </Row>
                <Row className={style.padRow} justify='center'>
                    <Col md={1}>
                        <StandardButton styleType={'link'}>
                            {'Clicky'}
                        </StandardButton>
                    </Col>
                    <Col md={1}>
                        <StandardButton styleType={'link'} disabled>
                            {'No-Clicky'}
                        </StandardButton>
                    </Col>
                    <Col md={1}>
                        <StandardButton styleType={'link'}>
                            <Delete />
                            {'Delete'}
                        </StandardButton>
                    </Col>
                </Row>
                <Row className={style.padRow} justify='center'>
                    <Col md={1}>
                        <StandardButton styleType={'custom'} customStyle={MicrocredCustomStyledButton}>
                            {'Clicky'}
                        </StandardButton>
                    </Col>
                    <Col md={1}>
                        <StandardButton styleType={'custom'} customStyle={MicrocredCustomStyledButton} disabled>
                            {'No-Clicky'}
                        </StandardButton>
                    </Col>
                    <Col md={1}>
                        <StandardButton styleType={'custom'} customStyle={MicrocredCustomStyledButton}>
                            <Delete />
                            {'Delete'}
                        </StandardButton>
                    </Col>
                </Row>
                <div style={{ marginTop: '100px' }} />
                <Row className={style.padRow} justify='center'>
                    <Col md={5}>
                        <StandardInput value={this.state.textValue} onChange={(e) => this.setState({ textValue: e.target.value })} />
                    </Col>
                </Row>
                <Row className={style.padRow} justify='center'>
                    <Col md={5}>
                        <StandardInput label={'Input must be x or y.'} />
                    </Col>
                </Row>
                <Row className={style.padRow} justify='center'>
                    <Col md={5}>
                        <StandardInput error={'Error! You did something wrong mate.'} />
                    </Col>
                </Row>
                <Row className={style.padRow} justify='center'>
                    <Col md={5}>
                        <StandardInput readOnly value={'Reading only!'} />
                    </Col>
                </Row>
                <div style={{ marginTop: '100px' }} />
                <Row className={style.padRow} justify='center'>
                    <Col md={5}>
                        <StandardDropdown
                          value={this.state.selectedDropdownItem}
                          onChange={this.handleDropdownSelect}
                        >
                            <MenuItem disableRipple value={undefined}>None</MenuItem>
                            <MenuItem disableRipple value={0}>Item 1</MenuItem>
                            <MenuItem disableRipple value={1}>Item 2</MenuItem>
                            <MenuItem disableRipple value={2}>Item 3</MenuItem>
                            <MenuItem disableRipple value={3}>Item 4</MenuItem>
                            <MenuItem disableRipple value={4}>Item 5</MenuItem>
                            <MenuItem disableRipple value={5}>Item 6</MenuItem>
                            <MenuItem disableRipple value={6}>Item 7</MenuItem>
                        </StandardDropdown>
                    </Col>
                </Row>
                <Row className={style.padRow} justify='center'>
                    <Col md={5}>
                        <StandardDropdown styleType='error'
                          value={this.state.selectedDropdownItem}
                          onChange={this.handleDropdownSelect}
                        >
                            <MenuItem disableRipple value={undefined}>None</MenuItem>
                            <MenuItem disableRipple value={0}>Item 1</MenuItem>
                            <MenuItem disableRipple value={1}>Item 2</MenuItem>
                            <MenuItem disableRipple value={2}>Item 3</MenuItem>
                            <MenuItem disableRipple value={3}>Item 4</MenuItem>
                            <MenuItem disableRipple value={4}>Item 5</MenuItem>
                            <MenuItem disableRipple value={5}>Item 6</MenuItem>
                            <MenuItem disableRipple value={6}>Item 7</MenuItem>
                            <MenuItem disableRipple value={7}>Item 8</MenuItem>
                            <MenuItem disableRipple value={8}>Item 9</MenuItem>
                            <MenuItem disableRipple value={9}>Item 10</MenuItem>
                        </StandardDropdown>
                    </Col>
                </Row>
                <div style={{ marginTop: '100px' }} />
                <Row className={style.padRow} justify='center'>
                    <Col md={5}>
                        <StandardTabs value={this.state.selectedTab}
                          onChange={this.handleTabChange}
                          scrollable
                          indicatorColor='accent'
                          TabScrollButton={
                              ({ onClick, direction, visible }) =>
                              <StandardButton styleType='white'
                                onClick={onClick}
                                disabled={!visible}
                              >
                                {direction === 'left' ? <ArrowLeft/> : <ArrowRight/>}
                              </StandardButton>
                          }
                        >
                            <StandardTab label='General info' />
                            <StandardTab label='Contact info' />
                            <StandardTab label='Assigned roles' />
                            <StandardTab label='Credentials' />
                            <StandardTab label='External credentials' />
                            <StandardTab label='Business unit management' />
                            <StandardTab label='Access policy' />
                        </StandardTabs>
                        {this.state.selectedTab === 0 && <Row justify='center'><Typography>General info</Typography></Row>}
                        {this.state.selectedTab === 1 && <Row justify='center'><Typography>Contact info</Typography></Row>}
                        {this.state.selectedTab === 2 && <Row justify='center'><Typography>Assigned roles</Typography></Row>}
                        {this.state.selectedTab === 3 && <Row justify='center'><Typography>Credentials</Typography></Row>}
                        {this.state.selectedTab === 4 && <Row justify='center'><Typography>External credentials</Typography></Row>}
                        {this.state.selectedTab === 5 && <Row justify='center'><Typography>Business unit management</Typography></Row>}
                        {this.state.selectedTab === 6 && <Row justify='center'><Typography>Access policy</Typography></Row>}
                    </Col>
                </Row>
                <div style={{ marginTop: '700px' }} />
            </div>
        );
    }
}

StandardDemo.propTypes = {

};

StandardDemo.contextTypes = {
    router: PropTypes.object
};
