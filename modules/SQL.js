// Get config.
const config = require('../system/configBuilder');

// Check if SQL is disabled.
if (!config.SQL.Use) {
    // In that case stub the object.
    global.sql = {
        send: () => {
            let promise = new Promise((resolve, reject) => {
                global.logger.error('Tried to use SQL while disabled.');
                reject(new Error('Tried to use SQL while disabled.'));
            });

            return promise;
        }
    };
    return;
}

// Get dependencies.
const sql = require('mysql');

// Setup connection.
var dbConnection = sql.createConnection({
    host: config.SQL.IP,
    port: config.SQL.Port,
    user: config.SQL.Username,
    password: config.SQL.Password,
    database: config.SQL.Database
});

// Connect.
dbConnection.connect(function(err) {
    if (err) {
        global.logger.error('SQL Error ' + err.code);
    } else {
        global.logger.info('SQL connected at ' + config.SQL.IP + ':' + config.SQL.Port + ' with ' + config.SQL.Username + '/' + config.SQL.Password);
    }
});

// Create object to be used by requests.
global.sql = {
    send: (query) => {
        let promise = new Promise((resolve, reject) => {
            dbConnection.query(query, function(err, result) {
                if (err) {
                    global.logger.error('SQL error ' + err.code);
                    resolve(err);
                } else {
                    global.logger.info('SQL response ' + JSON.stringify(result));
                    resolve(result);
                }
            });
        });

        return promise;
    }
};
