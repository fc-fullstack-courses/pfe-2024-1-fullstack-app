const path = require('path');

const CONSTANTS = {
  PUBLIC_FOLDER_PATH: path.resolve(__dirname, 'public'),
  PASSWORD_REGEX: /^[a-zA-Z0-9!@#$%^&*()_+-=]{6,}$/,
  SALT_ROUNDS: 13,
};

module.exports = CONSTANTS;
