const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const userRoute = require('./routes/users')
server.use('/users', userRoute)

server.get('/', (req, res) => res.send('Welcome to Quiz War'));

module.exports = server
