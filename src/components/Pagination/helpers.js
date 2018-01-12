
/**
 * Computes the range of pages that should appear in the middle of 'range selector'
 * Examples (with visiblePages = 5):
 *  1 ..  5  6  7  8  9 .. 20    ACTIVE:7 RESULT: {start: 5, end: 9}
 *  1  2  3  4  5  6  7 .. 20    ACTIVE:1 RESULT: {start: 3, end: 9}
 *  1  2  3  4  5  6  7  8  9    ACTIVE:9
 *  1  2  3  4  5  6  7 .. 10    ACTIVE 2
 *  1 ..  5  6  7  8  9 .. 16    ACTIVE:7
*/
function getRange(params) {
    let { visiblePages, currentPage, pagesTotal } = params;
    if (pagesTotal - currentPage > 2 && pagesTotal - visiblePages > 2) {
        // we need 2 'slots' for the right (the dots & the last page)
        visiblePages -= 2;
    }
    if (pagesTotal - currentPage > 2 && pagesTotal - visiblePages > 2) {
        // we need 2 'slots' for the right (the dots & the last page)
        visiblePages -= 2;
    }
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
function getRangesAllowForAdvanced(params) {
    const { startPage, endPage } = getRange(params);
    // If we got 'too close for comfort'
}
computeState(props) {
    const { visiblePages, pagination } = props;
    const pagesTotal = pagination.get('pagesTotal', 1);
    const currentPage = pagination.get('pageNumber', 0);


}