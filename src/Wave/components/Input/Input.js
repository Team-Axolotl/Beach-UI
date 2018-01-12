import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import classnames from 'classnames';
import Icon from '../Icon';
import { defaultProps, propTypes } from './propTypes';

import styles from './styles.css';

export default class Input extends Component {
    static propTypes = propTypes

    static defaultProps = defaultProps

    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            focused: false
        };
        this.handleChange = debounce(this.handleChange.bind(this), 150);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }

    onChange = (e) => {
        // Update internal state so that <input /> is able to receive the latest value
        // Afterwards call debounced handleChange (fire ONLY one change event in 300ms to avoid multiple dispatched actions)
        const { value } = e.target;
        this.setState({
            value
        }, () => {
            this.handleChange();
        });
    }

    onKeyPress = (e) => {
        if (e.charCode === 13) {
            const { inputKey, onEnterPress } = this.props;
            const { value } = this.state;
            onEnterPress({
                value,
                key: inputKey
            });
        }
    }

    onInputRowClick = (e) => {
        const { disabled } = this.props;
        if (disabled) {
            return;
        }
        const focusBehaviour = e.target.getAttribute('data-focus-behaviour');
        if (focusBehaviour === 'focus') {
            this.focus();
        }
        if (focusBehaviour === 'focusless') {
            this.focus();
        }
        if (focusBehaviour === 'toggle') {
            const { focused } = this.state;
            this[focused ? 'blur' : 'focus']();
        }
    }

    onClear = () => {
        const { inputKey, onClear, onChange } = this.props;
        onClear({
            key: inputKey,
            value: ''
        });
        onChange({
            key: inputKey,
            value: ''
        });
        // Simulate on change event to the input
        this.onChange({
            target: {
                value: ''
            }
        });
    }

    get inputClasses() {
        const { borderBottom, error, disabled, label, canClear, readOnly } = this.props;
        const { focused, value } = this.state;
        const hasClearButton = !!value && canClear && !disabled;
        return {
            container: classnames(styles.container, {
                [styles.borderBottom]: borderBottom
            }),
            inputWrapper: classnames(styles.inputWrapper, {
                [styles.fullWidth]: !label
            }),
            inputRowWrapper: classnames(styles.inputRowWrapper, {
                [styles.hasError]: !!error,
                [styles.focused]: !error && focused,
                [styles.disabled]: disabled
            }),
            input: classnames(styles.input, {
                [styles.disabled]: disabled.activeElement,
                [styles.hasClear]: hasClearButton
            }),
            clearButton: classnames(styles.clearButton, {
                [styles.visible]: hasClearButton
            })

        };
    }

    focus = () => {
        const { onFocus } = this.props;
        if (this.inputNode !== document.activeElement && this.inputNode.setSelectionRange) {
            // Move cursor to the end of the input if input is not already focused
            const valueLength = this.inputNode.value.length * 2;
            this.inputNode.setSelectionRange(valueLength, valueLength);
        }
        this.inputNode.focus();
        this.setState({
            focused: true
        });
        setTimeout(() => {
            // Wait Redux update to focus
            onFocus();
        }, 0);
    }

    blur = () => {
        const { onBlur } = this.props;
        this.setState({
            focused: false
        });
        this.inputNode.blur();
        onBlur();
    }

    handleChange = () => {
        // This will only execute ONCE in 300ms when change event is fired
        // (if there are multiple change events only latest will be fired with computed final value by this moment)
        const { inputKey, onChange } = this.props;
        const { value } = this.state;
        onChange({
            value,
            key: inputKey
        });
    }

    render() {
        const { type, label, isRequired, disabled, error, sideNote, readOnly, placeholder, rightButton, rightButtonClassname, canClear } = this.props;
        const { onButtonClick } = this.props;
        const { value: stateValue } = this.state;
        const inputClasses = this.inputClasses;

        return (
            <div className={inputClasses.container}>
                {label ? <span className={styles.label}>{`${label}${isRequired ? '*' : ''}`}</span> : null}
                <div className={inputClasses.inputWrapper}>
                    <div
                        className={inputClasses.inputRowWrapper}
                        data-menu-target
                        onClick={this.onInputRowClick} >
                        <div className={styles.relative}>
                            <input
                                readOnly={readOnly && !disabled}
                                ref={(node) => { this.inputNode = node; }}
                                type={type}
                                data-focus-behaviour='focus'
                                placeholder={placeholder}
                                value={stateValue}
                                className={inputClasses.input}
                                disabled={disabled}
                                spellCheck={false}
                                onKeyPress={this.onKeyPress}
                                onChange={this.onChange}
                                onBlur={this.blur} />
                            <span
                                data-focus-behaviour='focusless'
                                className={inputClasses.clearButton}
                                onClick={this.onClear} >
                                <Icon
                                    glyph='close'
                                    className={styles.clearButtonSvg} />
                            </span>
                        </div>
                        {
                            rightButton ?
                                <span
                                    className={classnames(rightButtonClassname)}
                                    onMouseDown={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                    }}
                                    data-focus-behaviour='toggle'
                                    onClick={onButtonClick}>{rightButton}</span> :
                                null
                        }
                    </div>
                    {error ? <span className={styles.errorMessage}>{error}</span> : null}
                    {sideNote ? <span className={styles.sideNote}>{sideNote}</span> : null}
                </div>
            </div>
        );
    }
}
