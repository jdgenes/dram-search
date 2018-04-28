var Client = require('mariasql');

var connection = new Client({
    host: '127.0.0.1',
    user: '',
    password: '',
    db: ''
});

module.exports = connection;
