var express = require('express');
var router = express.Router();
const errorHandle = require('../service/errorHandle')
const sucessHandle = require('../service/sucessHandle')
const User = require('../models/user')
const userController = require('../controllers/user')

/* GET users listing. */
router.get('/', userController.getAllUser);
router.post('/', userController.createUser);

module.exports = router;
