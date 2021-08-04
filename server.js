
const router = require('express').Router();
const user = require('./V1/routes/user');

router.use('/customer',user.userRouter);

module.exports = router


