// Combine the user config with the defaults.
const userConfig = require('./configs/dreamConfig.js');

// Set the logger.
global.logger = require('./system/logger');

// Report startup.
global.logger.info('Starting Dream!');

// Load modules.
var modules = Object.keys(userConfig);

for (var i = 0; i < modules.length; i++) {
    global.logger.warn('Module [' + modules[i] + '] loading...');

    try {
        require('./modules/' + modules[i] + '.js');
    } catch (ex) {
        global.logger.error('Could not load module [' + modules[i] + '].');
        global.logger.error('   ' + ex.message);
    }
}
