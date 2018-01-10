module.exports = {
    info: (message) => { console.log(new Date().toGMTString() + ' \x1b[34m%s\x1b[0m', message); },
    warn: (message) => { console.log(new Date().toGMTString() + ' \x1b[32m%s\x1b[0m', message); },
    error: (message) => { console.log(new Date().toGMTString() + ' \x1b[35m%s\x1b[0m', message); }
};
