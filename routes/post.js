var express = require('express');
var router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const validateMiddleware = require("../middleware/validationMiddleware");

// Require controller modules.
var postController = require('../controllers/postController');


router.get('/show/:id', postController.find)
router.post('/store',authMiddleware,validateMiddleware, postController.store)
router.get('/create',authMiddleware, postController.newPost)


module.exports = router;
