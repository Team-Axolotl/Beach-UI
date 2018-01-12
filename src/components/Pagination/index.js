import React from 'react';
import PropTypes from 'prop-types';
import { Map, fromJS } from 'immutable';
import ButtonBase from 'material-ui/ButtonBase';
import Popover from 'material-ui/Popover';

import MorePages from './MorePages';
import style from './style.css';
import classnames from 'classnames';

const defaultOnPaginationChange = (pagination) => { console.log(pagination && pagination.toJS && pagination.toJS()); };
const asNumberOrDefault = (maybeNum, valueIfNaN) => {
    const number = Number(maybeNum);
    return isNaN(number) ? valueIfNaN : number;
};

class Pagination extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = this.computeState(props);

        this.renderPaginators = this.renderPaginators.bind(this);
        this.handlePageSelect = this.handlePageSelect.bind(this);
    }
    handlePageSelect(e) {
        const { onPaginationChange, pagination } = this.props;
        const oldPageNumber = pagination.get('pageNumber');
        const pageNumber = asNumberOrDefault(e.target && e.target.dataset && e.target.dataset.pagenumber, oldPageNumber);
        if (typeof onPaginationChange === 'function' && oldPageNumber !== pageNumber) {
            onPaginationChange(pagination.set('pageNumber', pageNumber));
        }
    }
    computeState(props) {
        const { visiblePages, pagination } = props;
        const pagesTotal = pagination.get('pagesTotal', 1);
        const currentPage = pagination.get('pageNumber', 0);

        const otherPages = visiblePages - 1;
        const maxExpandRight = Math.ceil(otherPages / 2);
        const maxExpandLeft = otherPages - maxExpandRight;
        const right = Math.min(pagesTotal - currentPage, maxExpandRight);
        const left = Math.min(currentPage - 1, maxExpandLeft);
        const remainingExpand = otherPages - (right + left);
        const startPage = Math.max(1, currentPage - left - remainingExpand);
        const endPage = Math.min(pagesTotal, currentPage + right + remainingExpand);
        return {
            startPage,
            endPage
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState(this.computeState(nextProps));
    }
    renderPaginators() {
        const { startPage, endPage } = this.state;
        const { pagination } = this.props;
        const currentPage = pagination.get('pageNumber', 0);

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            const className = currentPage === i ? style.paginationItemActive : '';
            pages.push(
                <span
                  key={i}
                  data-pageNumber={i}
                  className={classnames(style.paginationItem, className)}
                  onClick={currentPage !== i && this.handlePageSelect}>
                    {i}
                </span>
            );
        }
        return pages;
    }
    render() {
        const { pagination, className, ...rest } = this.props;
        const pagesTotal = pagination.get('pagesTotal', 1);
        const currentPage = pagination.get('pageNumber', 0);

        return (
            <div className={classnames(style.pagination, className)} {...rest}>
                <span className={style.manualPicker}>
                    <input type='number' min={1} max={pagesTotal} value={currentPage} />
                    <span>/ <span style={{fontWeight: 700}}>{pagesTotal}</span> <span style={{color: '#afafaf'}}>Pages</span></span>
                </span>
                <span className={style.paginatorsContainer}>
                    {this.renderPaginators()}
                    <MorePages start={this.state.endPage} end={Math.min(pagesTotal, this.state.endPage + 12)} />
                </span>
                <span className={style.pageControl}>
                    page control..
                </span>
            </div>
        );
    }
}

Pagination.propTypes = {
    pagination: PropTypes.instanceOf(Map), // {pagesTotal, pageSize, pageNumber, recordsTotal}
    visiblePages: PropTypes.number,
    onPaginationChange: PropTypes.func
};

Pagination.defaultProps = {
    pagination: fromJS({
        pagesTotal: 30,
        pageSize: 25,
        pageNumber: 10,
        recordsTotal: 0
    }),
    visiblePages: 4,
    onPaginationChange: defaultOnPaginationChange
};

export default Pagination;
