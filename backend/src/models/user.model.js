const db = require('../config/database');

const getAllUsers = () => {
  return db.any('SELECT * FROM users');
};

const getUserById = (id) =>{
  return db.one(`SELECT * FROM users WHERE id = ${id}`);
};
module.exports = {
    getAllUsers,
    getUserById
};