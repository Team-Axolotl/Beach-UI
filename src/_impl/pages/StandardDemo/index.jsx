import React from 'react';
import PropTypes from 'prop-types';

import Row from '_dream/containers/Row';
import Col from '_dream/containers/Col';

import Delete from 'material-ui-icons/Delete';
import StandardButton from '_standard/components/StandardButton';
import StandardInput from '_standard/components/StandardInput';
import StandardTabs from '_standard/components/StandardTabs';
import StandardTab from '_standard/components/StandardTab';

import { TabScrollButton } from 'material-ui/Tabs';

import Arrow from 'material-ui-icons/KeyboardArrowRight';

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
            selectedTab: 0
        };

        this.handleTabChange = this.handleTabChange.bind(this);
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
                        <StandardTabs value={this.state.selectedTab}
                          onChange={this.handleTabChange}
                          scrollable
                          indicatorColor='accent'
                          TabScrollButton={({ onClick }) => <StandardButton styleType='white' onClick={onClick}><Arrow /></StandardButton>}>
                            <StandardTab label='General info' />
                            <StandardTab label='Contact info' />
                            <StandardTab label='Assigned roles' />
                            <StandardTab label='Credentials' />
                            <StandardTab label='External credentials' />
                            <StandardTab label='Business unit management' />
                            <StandardTab label='Access policy' />
                        </StandardTabs>
                    </Col>
                </Row>
            </div>
        );
    }
}

StandardDemo.propTypes = {

};

StandardDemo.contextTypes = {
    router: PropTypes.object
};
