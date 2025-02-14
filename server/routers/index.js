const rootRouter = require('express').Router();
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
const { checkAccessToken } = require('../middlewares/tokenMW');

rootRouter.use('/users', userRouter);
rootRouter.use('/auth', authRouter);

rootRouter.get('/secret', checkAccessToken, (req, res, next) => {

  res.status(200).send({ data: 'secret data'});
});

module.exports = rootRouter;
