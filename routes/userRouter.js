var express = require('express');
var router = express.Router();

// Require controller modules.
var userController = require('../controllers/userController');


router.get('/', userController.index)
router.get('/create', userController.create)
router.post('/create', userController.store)
router.get('/edit/:id', userController.find)
router.get('/delete/:id', userController.delete)
router.post('/update/:id', userController.update)
router.get('/lga/:id', userController.getLga)


module.exports = router;