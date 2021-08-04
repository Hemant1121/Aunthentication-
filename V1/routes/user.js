const express = require('express');
const userRouter = express.Router();
const customerController = require('../controller/customer');
const verify = require('../../middleware/verify_token')


//API
userRouter.post('/register',customerController.registerCustomer);
userRouter.post('/login',customerController.loginCustomer);
userRouter.get('/post',verify,customerController.poste);



exports.userRouter= userRouter;