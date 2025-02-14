const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const AuthService = require('../services/auth.service');

module.exports.registration = async (req, res, next) => {
  try {
    const { body, file } = req;

    const user = await User.create({
      ...body,
      imgSrc: file ? file.filename : null,
    });

    // генеруємо JWT для можливого рефрешу або для маршрутів зщо потребують авторизації
    const sessionData = await AuthService.createSession(user);

    res.status(201).send({ data: sessionData });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;

    // 1. знайти користувача якого логіними (ідентифікація)
    const user = await User.findOne({
      where: { email },
    });

    // 1.5 Якщо користувач не знайдений відсилаємо 404
    if (!user) {
      throw createHttpError(404, 'User with this data not found');
    }

    // 2. перевірити відповідність пароля наявному хешу у БД
    const isSamePassword = await bcrypt.compare(password, user.password);

    // 2.5 киаємо помилку якщо пароль не збігається
    if (!isSamePassword) {
      throw createHttpError(404, 'User with this data not found');
    }

    // 3. генеруємо JWT для можливого рефрешу або для маршрутів зщо потребують авторизації
    const sessionData = await AuthService.createSession(user);

    res.status(201).send({ data: sessionData });
  } catch (error) {
    next(error);
  }
};

// оновлення сесії по якимось даним з фронта
module.exports.refreshSession = async (req, res, next) => {
  try {
    const { tokenInstance } = req;

    // генеруємо нову сессію для користувача
    const sessionData = await AuthService.refreshSession(tokenInstance);

    res.status(201).send({ data: sessionData });
  } catch (error) {
    next(error);
  }
};
