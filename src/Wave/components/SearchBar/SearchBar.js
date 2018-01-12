import React from 'react';
import Input from '../Input';
import Icon from '../Icon';
import { propTypes, defaultProps } from './propTypes';

import styles from './styles.css';

export default class SearchBar extends React.Component {
    static propTypes = propTypes;
    static defaultProps = defaultProps;

    handleSubmit = () => {
        const { inputKey, value } = this.props;
        this.props.onSubmit({
            value,
            key: inputKey
        });
    }

    render() {
        const { inputKey, value, label, placeholder, borderBottom, inputProps } = this.props;
        const { onChange, onSubmit } = this.props;
        return (
            <div className={styles.searchBarContainer}>
                <Input
                    {...inputProps}
                    inputKey={inputKey}
                    value={value}
                    label={label}
                    placeholder={placeholder}
                    borderBottom={borderBottom}
                    rightButtonClassname={styles.submitButton}
                    rightButton={<Icon glyph='searchbar_search' />}
                    onButtonClick={this.handleSubmit}
                    onChange={onChange}
                    onEnterPress={onSubmit} />
            </div>
        );
    }
}