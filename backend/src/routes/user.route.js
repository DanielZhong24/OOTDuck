const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user.controller');

router.get('/',usersController.listAllUsers);
router.get('/:id',usersController.listUserById);

module.exports = router;