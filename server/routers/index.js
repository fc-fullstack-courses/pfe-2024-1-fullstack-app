const rootRouter = require('express').Router();
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');

rootRouter.use('/users', userRouter);
rootRouter.use('/auth', authRouter);

module.exports = rootRouter;
