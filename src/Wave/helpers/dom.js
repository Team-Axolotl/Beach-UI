import { capitalizeFirstLetter } from './utils';

const _computeStyle = (element, styleRuleStart, styleRuleEnd = '') => {
    const dimensions = ['top', 'right', 'bottom', 'left'];
    return dimensions.reduce((result, currentDimension) => {
        const propertyName = styleRuleStart + capitalizeFirstLetter(currentDimension) + capitalizeFirstLetter(styleRuleEnd);
        // eslint-disable-next-line no-param-reassign
        result[propertyName] = parseFloat(element.style[propertyName]) || 0;

        return result;
    }, {});
};

const _matchesPolyfill = (element, selector) => {
    const elements = (element.document || element.ownerDocument).querySelectorAll(selector);
    let index = 0;

    while (elements[index] && elements[index] !== element) {
        index += 1;
    }

    return Boolean(elements[index]);
};

export const matches = (element, selector) => {
    // returns true if the element would be selected by the specified selector string
    // otherwise, returns false

    const matchesNative = typeof element.matches === 'function' &&
          (element.matches || element.msMatchesSelector ||
            element.mozMatchesSelector || element.webkitMatchesSelector);

    return matchesNative ? element.matches(selector) : _matchesPolyfill(element, selector);
};

const _closestPolyfill = (element, selector) => {
    while (element && element.nodeType === 1) {
        if (matches(element, selector)) {
            return element;
        }

        // eslint-disable-next-line no-param-reassign
        element = element.parentNode;
    }

    return null;
};

export const closest = (element, selector) => {
    // returns the closest ancestor of the element which matches the given selectors
    // if there isn't such an ancestor, it returns null

    const closestNative = typeof element.closest === 'function' && element.closest;
    return closestNative ? element.closest(selector) : _closestPolyfill(element, selector);
};

// Get width, height, margins and borders of an HTML element, including 
export const getMarginBox = (element) => {
    const rect = element.getBoundingClientRect();
    const margins = _computeStyle(element, 'margin');
    const borders = _computeStyle(element, 'border');

    return {
        width: rect.width,
        height: rect.height,
        borders,
        margins
    };
};
