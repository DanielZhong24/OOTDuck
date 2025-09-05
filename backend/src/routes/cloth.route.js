const express = require('express');
const router = express.Router();
const clothesController = require('../controllers/cloth.controller');

router.get('/',clothesController.listAllClothes);

module.exports = router;