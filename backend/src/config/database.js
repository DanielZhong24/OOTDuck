const pgp = require('pg-promise')();
require('dotenv').config();
const connection =  process.env.DB_CONNECTION;
const db = pgp(connection);



module.exports = db;