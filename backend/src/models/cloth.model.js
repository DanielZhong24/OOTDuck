const db = require('../config/database');

const getAllClothes = () => {
  return db.any('SELECT * FROM cloth');
};

module.exports = {
    getAllClothes
};