var express = require('express');
var router = express.Router();

// Require controller modules.
var categoryController = require('../controllers/categoryController');


router.get('/', categoryController.index)
router.get('/create',categoryController.create)
router.post('/create',categoryController.store)
router.get('/edit/:id',categoryController.find)
router.get('/delete/:id',categoryController.delete)
router.post('/update/:id',categoryController.update)


module.exports = router;