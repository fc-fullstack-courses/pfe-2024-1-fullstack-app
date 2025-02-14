const jwt = require('jsonwebtoken');
const { promisify } = require('node:util');

const jwtSign = promisify(jwt.sign);
const jwtVerify = promisify(jwt.verify);

const tokenConfig = {
  access: {
    secret: 'sdjfhubf43b45rh33he940hr94hr93',
    expiresIn: '7d'
  }
}

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

// Access token - токен доступу, використовується для авторизації власника
module.exports.createAccessToken = (payload) => createToken(payload, tokenConfig.access);
module.exports.verifyAccessToken = (token) => verifyToken(token, tokenConfig.access);