import React from 'react';
import PropTypes from 'prop-types';

import Row from '_dream/containers/Row';
import Col from '_dream/containers/Col';

import Delete from 'material-ui-icons/Delete';
import StandardButton from '_standard/components/StandardButton';
import StandardInput from '_standard/components/StandardInput';

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
            textValue: ''
        };
    }
    render() {
        return (
            <div>
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
                        <StandardButton type={'white'}>
                            {'Clicky'}
                        </StandardButton>
                    </Col>
                    <Col md={1}>
                        <StandardButton type={'white'} disabled>
                            {'No-Clicky'}
                        </StandardButton>
                    </Col>
                    <Col md={1}>
                        <StandardButton type={'white'}>
                            <Delete />
                            {'Delete'}
                        </StandardButton>
                    </Col>
                </Row>
                <Row className={style.padRow} justify='center'>
                    <Col md={1}>
                        <StandardButton type={'blue'}>
                            {'Clicky'}
                        </StandardButton>
                    </Col>
                    <Col md={1}>
                        <StandardButton type={'blue'} disabled>
                            {'No-Clicky'}
                        </StandardButton>
                    </Col>
                    <Col md={1}>
                        <StandardButton type={'blue'}>
                            <Delete />
                            {'Delete'}
                        </StandardButton>
                    </Col>
                </Row>
                <Row className={style.padRow} justify='center'>
                    <Col md={1}>
                        <StandardButton type={'label'}>
                            {'Clicky'}
                        </StandardButton>
                    </Col>
                    <Col md={1}>
                        <StandardButton type={'label'} disabled>
                            {'No-Clicky'}
                        </StandardButton>
                    </Col>
                    <Col md={1}>
                        <StandardButton type={'label'}>
                            <Delete />
                            {'Delete'}
                        </StandardButton>
                    </Col>
                </Row>
                <Row className={style.padRow} justify='center'>
                    <Col md={1}>
                        <StandardButton type={'link'}>
                            {'Clicky'}
                        </StandardButton>
                    </Col>
                    <Col md={1}>
                        <StandardButton type={'link'} disabled>
                            {'No-Clicky'}
                        </StandardButton>
                    </Col>
                    <Col md={1}>
                        <StandardButton type={'link'}>
                            <Delete />
                            {'Delete'}
                        </StandardButton>
                    </Col>
                </Row>
                <Row className={style.padRow} justify='center'>
                    <Col md={1}>
                        <StandardButton type={'custom'} customStyle={MicrocredCustomStyledButton}>
                            {'Clicky'}
                        </StandardButton>
                    </Col>
                    <Col md={1}>
                        <StandardButton type={'custom'} customStyle={MicrocredCustomStyledButton} disabled>
                            {'No-Clicky'}
                        </StandardButton>
                    </Col>
                    <Col md={1}>
                        <StandardButton type={'custom'} customStyle={MicrocredCustomStyledButton}>
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
                        <StandardInput error label={'Error! You did something wrong mate.'} />
                    </Col>
                </Row>
                <Row className={style.padRow} justify='center'>
                    <Col md={5}>
                        <StandardInput readOnly value={'Reading only!'} />
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
