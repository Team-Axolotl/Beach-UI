import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ButtonGroup from '../ButtonGroup';
import ListView from '../ListView';
import Modal from '../Modal';

import styles from './styles.css';

export default class Select extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        right: PropTypes.array.isRequired,
        checkedItems: PropTypes.array,
        moveableAll: PropTypes.bool
    };
    static defaultProps = {
        checkedItems: [],
        moveableAll: true
    };

    constructor(props) {
        super(props);
        this.state = {
            checkedItems: {
                left: [],
                right: props.checkedItems
            },
            rightItems: props.right,
            confirmModalIsOpen: false,
            confirmModalDirection: ''
        };
    }

    onMoveToLeft = () => {
        const rightItems = this.state.rightItems.filter(item => this.state.checkedItems.right.indexOf(item) === -1);
        this.setState({
            rightItems,
            checkedItems: Object.assign({}, this.state.checkedItems, {
                right: []
            })
        });
    }

    onMoveToRight = () => {
        const rightItems = this.state.rightItems.concat(this.state.checkedItems.left);
        this.setState({
            rightItems,
            checkedItems: Object.assign({}, this.state.checkedItems, {
                left: []
            })
        });
    }

    getButtons = (listViewData) => {
        const { moveableAll } = this.props;
        const { checkedItems } = this.state;
        const isDisabled = {
            toRight: checkedItems.left.length === 0,
            toLeft: checkedItems.right.length === 0,
            toRightAll: listViewData.left.length === 0,
            toLeftAll: listViewData.right.length === 0
        };

        const defaultButtons = [
            {
                type: isDisabled.toRight ? 'primaryLight' : 'primaryBlue',
                icon: 'arrow_move_item',
                disabled: isDisabled.toRight,
                className: classnames(styles.squareButton, styles.svgStyles, {
                    [styles.disabledSvg]: isDisabled.toRight
                }),
                onClick: this.onMoveToRight
            },
            {
                type: isDisabled.toLeft ? 'primaryLight' : 'primaryBlue',
                icon: 'arrow_move_item',
                disabled: isDisabled.toLeft,
                className: classnames(styles.leftIcon, styles.squareButton, styles.svgStyles, {
                    [styles.disabledSvg]: isDisabled.toLeft
                }),
                onClick: this.onMoveToLeft
            }
        ];
        const moveableAllButtons = [
            {
                type: isDisabled.toRightAll ? 'primaryLight' : 'primaryBlue',
                icon: 'arrow_move_allitems',
                disabled: isDisabled.toRightAll,
                className: classnames(styles.squareButton, styles.svgStyles, {
                    [styles.disabledSvg]: isDisabled.toRightAll
                }),
                onClick: this.openConfirmDialog.bind(this, 'right')
            },
            {
                type: isDisabled.toLeftAll ? 'primaryLight' : 'primaryBlue',
                icon: 'arrow_move_allitems',
                disabled: isDisabled.toLeftAll,
                className: classnames(styles.leftIcon, styles.squareButton, styles.svgStyles, {
                    [styles.disabledSvg]: isDisabled.toLeftAll
                }),
                onClick: this.openConfirmDialog.bind(this, 'left')
            }
        ];
        return moveableAll ? defaultButtons.concat(moveableAllButtons) : defaultButtons;
    }

    get listViewData() {
        return this.props.data.reduce((memo, item) => {
            const propertyName = this.state.rightItems.indexOf(item.id) > -1 ? 'right' : 'left';
            memo[propertyName].push(item);
            return memo;
        }, {
            left: [],
            right: []
        });
    }

    closeConfirmDialog = () => {
        this.setState({
            confirmModalIsOpen: false,
            confirmModalDirection: ''
        });
    }

    openConfirmDialog = (direction) => {
        this.setState({
            confirmModalIsOpen: true,
            confirmModalDirection: direction
        });
    }

    toggleCheckItem = (checkedItems, listKey) => {
        this.setState({
            checkedItems: Object.assign({}, this.state.checkedItems, {
                [listKey]: checkedItems
            })
        });
    }

    confirmMoveAll = () => {
        const rightItems = this.state.confirmModalDirection === 'right' ? this.props.data.map(item => item.id) : [];
        this.setState({
            rightItems,
            checkedItems: {
                left: [],
                right: []
            },
            confirmModalIsOpen: false,
            confirmModalDirection: ''
        });
    }

    handleSearch = ({ value }) => {
        if (value) {
            this.setState({
                checkedItems: {
                    left: [],
                    right: []
                }
            });
        }
    }

    render() {
        const { moveableAll } = this.props;

        return (
            <div className={styles.wrapper}>
                <ListView
                    searchable
                    multiselect
                    selectable
                    listKey='left'
                    items={this.listViewData.left}
                    onSearch={this.handleSearch}
                    selected={this.state.checkedItems.left}
                    onChange={this.toggleCheckItem} />
                <ButtonGroup
                    className={styles.buttonGroupWrapper}
                    type='vertical'
                    buttons={this.getButtons(this.listViewData)} />
                <ListView
                    searchable
                    multiselect
                    selectable
                    listKey='right'
                    items={this.listViewData.right}
                    onSearch={this.handleSearch}
                    selected={this.state.checkedItems.right}
                    onChange={this.toggleCheckItem} />
                {
                    moveableAll &&
                    <Modal
                        id='confirmDialog'
                        isOpen={this.state.confirmModalIsOpen}
                        close={this.closeConfirmDialog}
                        hasOverlay
                        header={{
                            text: 'Confirm this action'
                        }}
                        footer={{
                            actionButtons: [
                                { type: 'primaryBlue', label: 'Yes', onClick: this.confirmMoveAll },
                                { type: 'secondaryLong', label: 'No', onClick: this.closeConfirmDialog }
                            ]
                        }}>
                        Are you sure you want to move all items to the {this.state.confirmModalDirection}?
                    </Modal>
                }
            </div>
        );
    }
}