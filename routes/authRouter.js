var express = require('express');
var router = express.Router();
const auth = require('../middleware/authMiddleware');
const authRedirect = require('../middleware/redirectIfAuthenticatedMiddleware');


// Require controller modules.
var authController = require('../controllers/authController');

router.get('/login', authRedirect, authController.login)
router.post('/login', authRedirect, authController.loginUser)
router.get('/logout', auth, authController.logout)
router.post('/recovery-password/:userId/:token', authController.passwordReset)
router.get('/recovery-password/:userId/:token', authController.passwordResetForm)
router.post('/password-reset/', authController.forgotPassword)
router.get('/password-reset/', authController.passwordForm)


module.exports = router;