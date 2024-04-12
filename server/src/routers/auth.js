const router = require('express').Router();
const { Account } = require('../contollers');

router.post('/registration', Account.registration);
router.post('/login');
router.post('/logout');
router.get('/refresh');
router.get('/test', (req, res) => res.json('user test'));

module.exports = router;