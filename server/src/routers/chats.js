const router = require('express').Router();
const { Chats, Messages } = require('../contollers');
const validIdMiddleware = require('../middleware/valid-id-middleware');


router.get('/', Chats.getUsersChat);
router.post('/', Chats.create);
router.delete('/:chatId', Chats.remove);

router.get('/:chatId/messages', validIdMiddleware, Messages.getMessagesByChatId);
router.post('/:chatId/messages', validIdMiddleware, Messages.send);
router.delete('/:chatId/messages/:messageId', validIdMiddleware, Messages.remove)

module.exports = router;