module.exports = [
    {
        type: 'GET',
        location: '/',
        func: (req, res) => {
            res.send('Running DreamBackend');
        }
    },
    {
        type: 'POST',
        location: '/echo',
        func: (req, res, sql) => {
            return res.send(req.body);
        }
    }
];
