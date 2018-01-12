export const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);
export const lowerCaseFirstLetter = string => string.charAt(0).toLowerCase() + string.slice(1);

export const uuid = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };

    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
};

export const swap = ({ list, first, second }) => {
    const temp = list[first];
    list[first] = list[second];
    list[second] = temp;

    return list;
};
