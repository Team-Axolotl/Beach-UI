module.exports = {
    Frontend: {
        IP: '0.0.0.0',
        Port: 88,
        DevMode: true,
        REST: {
            Root: 'http://192.168.127.112:8003/',
            DefaultHeaders: {
                'Content-Type': 'application/json',
                accept: 'application/json'
            },
            DefaultBody: {
                jsonrpc: '2.0',
                id: '0'
            }
        }
    }
};
