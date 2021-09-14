const homeController = require('../controllers/home')
var express = require('express');
var router = express.Router();

router.get('/',homeController)

module.exports = router;