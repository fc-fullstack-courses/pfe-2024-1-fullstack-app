const jwt = require('jsonwebtoken');
const { promisify } = require('node:util');
const  CONSTANTS  = require('../constants');

const jwtSign = promisify(jwt.sign);
const jwtVerify = promisify(jwt.verify);

const tokenConfig = {
  access: {
    secret: CONSTANTS.ACCESS_TOKEN_SECRET,
    expiresIn: CONSTANTS.ACCESS_TOKEN_EXPIRES_IN,
  },
  refresh: {
    secret: CONSTANTS.REFRESH_TOKEN_SECRET,
    expiresIn: CONSTANTS.REFRESH_TOKEN_EXPIRES_IN,
  },
};

/**
 * Функція генерації токена
 * @param {object} payload - дані які зверігаються всередині токена
 * @param {object} options - об'єкт налаштувань токена
 * @param {string} options.secret - секрет токена
 * @param {string | number } options.expiresIn - час життя токена
 * @returns {Promise<string>}
 */
const createToken = (payload, { secret, expiresIn }) =>
  jwtSign(payload, secret, {
    expiresIn,
  });

/**
 * Функція валідації токена
 * @param {string} token - JWT токен який перевіряється
 * @param {object} options - об'єкт налаштувань токена
 * @param {string} options.secret - секрет токена
 * @returns {object} - об'єкт payload токена
 */
const verifyToken = (token, { secret }) => jwtVerify(token, secret);

// Access token - токен доступу, використовується для авторизації власника, багаторазовий
module.exports.createAccessToken = (payload) => createToken(payload, tokenConfig.access);
module.exports.verifyAccessToken = (token) => verifyToken(token, tokenConfig.access);

// Refresh token - токен оновлення, використовується для оновлення токена доступу, одноразовий
module.exports.createRefreshToken = (payload) => createToken(payload, tokenConfig.refresh);
module.exports.verifyRefreshToken = (token) => verifyToken(token, tokenConfig.refresh);
