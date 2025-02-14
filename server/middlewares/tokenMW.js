const createHttpError = require('http-errors');
const { RefreshToken } = require('../db/models');
const JwtService = require('../services/token.service');

module.exports.checkAccessToken = async (req, res, next) => {
  try {
    // токени доступу передають у заголовку Authorization
    // формат цього заголовку наступний 'type token'
    const {
      headers: { authorization },
    } = req;

    console.log(authorization)

    // 1. перевірити наявність заголовку
    if(!authorization) {
      throw createHttpError(401, 'Access token required');
    }

    // 2. перевіряємо наш токен доступу
    const [type, token] = authorization.split(' ');

    if(type !== 'Bearer') {
      throw createHttpError(401, 'Invalid token type');
    }

    const tokenData = await JwtService.verifyAccessToken(token);

    req.tokenData = tokenData;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports.checkRefreshToken = async (req, res, next) => {
  try {
    // якщо надіслали ПОСТ запит з токеном то реба оновити сесію
    const {
      body: { refreshToken },
    } = req;

    // 1. перевірити валідність токена
    const { id } = await JwtService.verifyRefreshToken(refreshToken);

    // 2. Перевірити наявність токену у БД
    const foundToken = await RefreshToken.findOne({
      where: {
        token: refreshToken,
        userId: id,
      },
    });

    if (!foundToken) {
      throw new createHttpError(404, 'Token not found.');
    }

    req.tokenInstance = foundToken;

    next();
  } catch (error) {
    next(error);
  }
};
