const router = require('express').Router();
const { Users, Account } = require('../contollers');
const validIdMiddleware = require('../middleware/valid-id-middleware');

router.get('/', Users.find);
router.get('/:userId', validIdMiddleware, Users.findById);
router.get('/avatar/:fileId', validIdMiddleware, Users.getAvatar);
router.put('/:userId', validIdMiddleware, Users.update);
router.delete('/:userId', validIdMiddleware, Account.remove);

module.exports = router;