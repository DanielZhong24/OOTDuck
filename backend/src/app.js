// src/app.js
const express = require('express');
const clothesRoutes = require('./routes/cloth.route');
const usersRoutes = require('./routes/user.route');

const app = express();
app.use(express.json());



app.use('/api/clothes',clothesRoutes);
app.use('/api/users',usersRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the!');
});

module.exports = app;