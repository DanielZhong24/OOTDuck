const db = require('../config/database');

const getAllUsers = () => {
  return db.any('SELECT * FROM users');
};

module.exports = {
    getAllUsers
};