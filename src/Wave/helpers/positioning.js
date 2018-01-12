import { getMarginBox } from './dom';

const positioning = {
    'top-left': ({ height }, { top, right, bottom, left }) => {
        return {
            bottom: `${(height + bottom) - top}px`,
            left: `${(0 + left) - right}px`
        };
    },
    'top-right': ({ height }, { top, right, bottom, left }) => {
        return {
            bottom: `${(height + bottom) - top}px`,
            right: `${(0 + right) - left}px`
        };
    },
    'bottom-left': ({ height }, { top, right, bottom, left }) => {
        return {
            top: `${(height + top) - bottom}px`,
            left: `${(0 + left) - right}px`
        };
    },
    'bottom-right': ({ height }, { top, right, bottom, left }) => {
        return {
            top: `${(height + top) - bottom}px`,
            right: `${(0 + right) - left}px`
        };
    },
    'right-top': ({ width }, { top, right, bottom, left }) => {
        return {
            top: `${(0 + top) - bottom}px`,
            left: `${(width + left) - right}px`
        };
    },
    'left-top': ({ width }, { top, right, bottom, left }) => {
        return {
            top: `${(0 + top) - bottom}px`,
            right: `${(width + right) - left}px`
        };
    },
    'bottom-center': ({ height }, { top, bottom }) => {
        return {
            top: `${(height + top) - bottom}px`,
            left: '50%',
            transform: 'translateX(-50%)'
        };
    },
    'top-center': ({ height }, { top, bottom }) => {
        return {
            bottom: `${(height + bottom) - top}`,
            left: '50%',
            transform: 'translateX(-50%)'
        };
    }
};

const _getOffsets = (targetDimensions, additionalOffsets = {}) => {
    const directions = ['top', 'right', 'bottom', 'left'];
    return directions.reduce((offsets, currentDirection) => {
        // eslint-disable-next-line no-param-reassign
        offsets[currentDirection] = additionalOffsets[currentDirection] || 0;

        return offsets;
    }, {});
};

// Get positioning styles (top and right) for absolute positioned element
// position - enum for positioning type (top-right, right-bottom and etc)
// target - the target element to calculate dimensions from and position to
// additionalOffsets - object with signutare {top, right, bottom, left}
export const getDimensions = (position, target, additionalOffsets) => {
    const targetDimensions = getMarginBox(target);
    let offsets = _getOffsets(position, additionalOffsets);
    if (!positioning[position]) {
        return {
            top: 0,
            right: 0
        };
    }

    return positioning[position](targetDimensions, offsets);
};
