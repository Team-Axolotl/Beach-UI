import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';

import style from './style.css';
import classnames from 'classnames';

class MorePages extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center'
            },
            transformOrigin: {
                vertical: 'bottom',
                horizontal: 'center'
            },
            position: {
                bottom: 200, // Just so the popover can be spotted more easily
                left: 400
            }, // Same as above
            anchorReference: 'anchorEl'
        };
        this.handleClickButton = () => {
            this.setState({ open: true });
        };
        this.handleRequestClose = () => {
            this.setState({ open: false });
        };
    }
    render() {
        const {
            open,
            anchorOrigin,
            transformOrigin,
            position,
            anchorReference
        } = this.state;
        return (
            <span
              className={classnames(style.paginationItem)}
              ref={node => { this.anchorEl = node; }}
              onClick={this.handleClickButton}>
                &hellip;
                <Popover
                  open={open}
                  anchorEl={this.anchorEl}
                  anchorReference={anchorReference}
                  anchorPosition={position}
                  onRequestClose={this.handleRequestClose}
                  anchorOrigin={anchorOrigin}
                  transformOrigin={transformOrigin}>
                haha
                </Popover>
            </span>
        );
    }
}

MorePages.propTypes = {
    start: PropTypes.number,
    end: PropTypes.number
};

export default MorePages;
