const router = require('express').Router();
const UsersRouter = require('./components/users/UsersRouter');


router.use('/users', UsersRouter)

module.exports = router;