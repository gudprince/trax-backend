var express = require('express');
var router = express.Router();

// Require controller modules.
var Tutorial = require('../controllers/tutorial');


router.get('/', Tutorial.index)
router.post('/',Tutorial.store)
router.get('/:id',Tutorial.find)
router.delete('/:id',Tutorial.delete)
router.put('/:id',Tutorial.update)


module.exports = router;