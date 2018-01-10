// Setup depedencies.
const path = require('path');
const express = require('express');

// Get config.
const config = require('../system/config');

// Start frontend server.
if (config.Frontend.DevMode) {
    global.logger.info('Starting frontend server in development mode using webpack-dev-server.');

    let webpack = require('webpack');
    let WebpackDevServer = require('webpack-dev-server');
    let webpackConfig = require('../configs/webpackConfig.js');
    let serverConfig = {
        hot: true,
        stats: 'errors-only',
        host: config.Frontend.IP,
        historyApiFallback: true
    };

    WebpackDevServer.addDevServerEntrypoints(webpackConfig, serverConfig);
    let compiler = webpack(Object.assign({ devtool: 'source-map' }, webpackConfig));

    let frontEnd = new WebpackDevServer(compiler, serverConfig);
    frontEnd.listen(config.Frontend.Port, config.Frontend.IP, function() {
        global.logger.info('Frontend server started on port ' + config.Frontend.Port);
    });
} else {
    global.logger.info('Starting frontend server in production mode using ExpressJS.');

    var frontEnd = express();
    var DIST_DIR = path.join(__dirname, '../docs');
    var HTML_FILE = path.join(DIST_DIR, 'index.html');

    frontEnd.use(express.static(DIST_DIR));
    frontEnd.get('*', (req, res) => res.sendFile(HTML_FILE));
    let httpServer = frontEnd.listen(config.Frontend.Port, function() {
        global.logger.info('Frontend server started on port ' + config.Frontend.Port);
    });

    // Hook events.
    httpServer.on('connection', (socket) => {
        let address = socket.address();
        global.logger.info('[SERVER-CLIENT] Incoming connection from ' + address.address + ':' + address.port);

        socket.on('close', (socket) => {
            global.logger.info('[SERVER-CLIENT] Closed connection from ' + address.address + ':' + address.port);
        });

        socket.on('error', (error) => {
            global.logger.error('[CLIENT] ' + error);
        });
    });

    httpServer.on('error', (error) => {
        global.logger.error('[SERVER] ' + error);
    });
}
