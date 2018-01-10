const mergeDeep = require('../src/helpers.js').mergeDeep;

const conf = mergeDeep({ }, require('./dreamConfigDefaults.json'), require('../configs/dreamConfig.js'));

module.exports = conf;
