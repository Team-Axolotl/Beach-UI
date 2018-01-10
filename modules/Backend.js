// Get requests.
const requests = require('../configs/requests');

// Get dependencies.
const express = require('express');
const bodyParser = require('body-parser');

// Get config.
const config = require('../system/config');

// Setup.
var server = express();
server.use(bodyParser.json()); // For JSON-encoded bodies.
server.use(bodyParser.urlencoded({ // For URL-encoded bodies.
    extended: true
}));

function sendingWrapper(req, res, request) {
    let socketAddress = req.socket.address();

    // Log request.
    global.logger.info('[' + request.type + '] ' + request.location + ' from ' + socketAddress.address + ':' + socketAddress.port);

    // If there is a body, log it.
    if (req.body) {
        global.logger.info('Received data: ' + JSON.stringify(req.body));
    }

    // Run the request function, and handle errors.
    let returnValue = request.func(req, res);

    // Check if promise.
    if (returnValue.catch) {
        returnValue.catch((error) => {
            res.send('Internal Error');
            return error;
        });
    }
};

for (let i = 0; i < requests.length; i++) {
    // Add if get.
    if (requests[i].type.toLowerCase() === 'get') {
        server.get(requests[i].location, (res, req) => sendingWrapper(res, req, requests[i]));
    }
    // Add if post.
    if (requests[i].type.toLowerCase() === 'post') {
        server.post(requests[i].location, (res, req) => sendingWrapper(res, req, requests[i]));
    }
}

// Start server.
let httpServer = server.listen(config.Backend.Port, function() {
    global.logger.info('Backend server started on port ' + config.Backend.Port);
});

// Hook events.
httpServer.on('connection', (socket) => {
    socket.on('error', (error) => {
        global.logger.error('[CLIENT] ' + error);
    });
});

httpServer.on('error', (error) => {
    global.logger.error('[SERVER] ' + error);
});
