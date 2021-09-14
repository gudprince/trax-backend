var express = require('express');
var router = express.Router();

// Require controller modules.
var productController = require('../controllers/productController');


router.get('/', productController.index)
router.get('/create',productController.create)
router.post('/create',productController.store)
router.get('/edit/:id',productController.find)
router.get('/delete/:id',productController.delete)
router.post('/update/:id',productController.update)


module.exports = router;