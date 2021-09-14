var express = require('express');
var router = express.Router();

// Require controller modules.
var modelController = require('../controllers/modelController');


router.get('/', modelController.index)
router.get('/create',modelController.create)
router.post('/create',modelController.store)
router.get('/edit/:id',modelController.find)
router.get('/delete/:id',modelController.delete)
router.post('/update/:id',modelController.update)


module.exports = router;