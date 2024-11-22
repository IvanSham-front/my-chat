const router = require('express').Router();
const { Account } = require('../contollers');

router.post('/registration', Account.registration);
router.post('/login', Account.login);
router.post('/checklogin', Account.checkLogin);
router.post('/logout', Account.logout);
router.get('/refresh', Account.refresh);

module.exports = router;