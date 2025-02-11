const authRouter = require('express').Router();
const { imagesUpload } = require('../utils/multer');
const { loginMW, createUserValidationMW } = require('../middlewares/authMW');
const AuthController = require('../controllers/authController');

authRouter.post(
  '/registration',
  imagesUpload.single('imgSrc'),
  createUserValidationMW,
  AuthController.registration
);

authRouter.post('/login', loginMW, AuthController.login);

module.exports = authRouter;
