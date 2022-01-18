// export const isNumeric = (n) => {
//     return !isNaN(parseFloat(n)) && isFinite(n);
// };

export const isNumber = (val) => {
    return typeof val === 'number' || val instanceof Number;
};


export const isString = (val) => {
    return typeof val === 'string' || val instanceof String;
};


export const removeLeadingSlash = (path) => {
    if (path[0] === '/') {
        path = path.substring(1, path.length);
    }

    return path;
}

export const bunnyBaseUrl = 'https://bv-pullzone-1.b-cdn.net';
