const authRouter = require('express').Router();
const { imagesUpload } = require('../utils/multer');
const { createUserValidationMW } = require('../middlewares/usersMW');
const AuthController = require('../controllers/authController');

authRouter.post(
  '/registration',
  imagesUpload.single('imgSrc'),
  createUserValidationMW,
  AuthController.registration
);

authRouter.post('/login', AuthController.login);

module.exports = authRouter;
