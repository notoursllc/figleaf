// export const isNumeric = (n) => {
//     return !isNaN(parseFloat(n)) && isFinite(n);
// };

export const isNumber = (val) => {
    return typeof val === 'number' || val instanceof Number;
};

export const isString = (val) => {
    return typeof val === 'string' || val instanceof String;
};
