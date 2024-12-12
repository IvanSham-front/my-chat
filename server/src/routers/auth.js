const router = require('express').Router();
const { Account } = require('../contollers');
const authMiddleware = require('../middleware/auth-middleware');

router.post('/registration', Account.registration);
router.post('/login', Account.login);
router.post('/checklogin', Account.checkLogin);
router.post('/logout', Account.logout);
router.get('/refresh', Account.refresh);
router.get('/user', authMiddleware, Account.getAuthUser);

module.exports = router;