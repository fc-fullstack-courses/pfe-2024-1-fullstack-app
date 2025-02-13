const authRouter = require('express').Router();
const { imagesUpload } = require('../utils/multer');
const { loginMW, registrationMW } = require('../middlewares/authMW');
const AuthController = require('../controllers/authController');

authRouter.post(
  '/registration',
  imagesUpload.single('imgSrc'),
  registrationMW,
  AuthController.registration
);

authRouter.post('/login', loginMW, AuthController.login);

module.exports = authRouter;
