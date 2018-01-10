module.exports = Object.assign({
    'Frontend': {
        'IP': '0.0.0.0',
        'Port': 80,
        'DevMode': true,
        'REST': {
            'Root': 'http://localhost:8003/',
            'DefaultHeaders': {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            'DefaultBody': {
                'jsonrpc': '2.0',
                'id': '0'
            }
        }
    }
});
