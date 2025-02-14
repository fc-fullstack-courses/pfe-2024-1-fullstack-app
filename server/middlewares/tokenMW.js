const createHttpError = require('http-errors');
const { RefreshToken } = require('../db/models');
const JwtService = require('../services/token.service');

module.exports.checkRefreshToken = async (req, res, next) => {
  try {
    // якщо надіслали ПОСТ запит з токеном то реба оновити сесію
    const {
      body: { refreshToken },
    } = req;

    // 1. перевірити валідність токена
    const { id } = await JwtService.verifyAccessToken(refreshToken);

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
}