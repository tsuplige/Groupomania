const express = require('express');

const userRoutes = require('./routes/user');

const messageRoutes = require('./routes/message');

const path = require('path');

const helmet = require('helmet');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(helmet());

app.use(express.json());
/**app.use('/images', express.static(path.join(__dirname, 'images'))); */

app.use('/api/auth', userRoutes);


app.use('/api/messages', messageRoutes);

module.exports = app;