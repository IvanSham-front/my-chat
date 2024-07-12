const router = require('express').Router();
const validIdMiddleware = require('../middleware/valid-id-middleware');
const { Files } = require('../contollers');


router.get('/stream/:fileId', validIdMiddleware, Files.getStreamFile);
router.get('/download/:fileId', validIdMiddleware, Files.download);

module.exports = router;