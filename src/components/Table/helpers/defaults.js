import style from './style.css';

/** */
function getRowClassName({index}) {
    if (index === -1) {
        // Handle the header row separately
        return style.tableRowHeader;
    } else {
        return style.tableRow;
    }
}

export { getRowClassName };