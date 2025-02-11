const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

module.exports.registration = async (req, res, next) => {
  try {
    const { body, file } = req;

    const user = await User.create({
      ...body,
      imgSrc: file ? file.filename : null,
    });

    const preparedUser = user.toJSON();

    delete preparedUser.password;
  
    res.status(201).send({ data: preparedUser });
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

    // 3. надсилаємо дані про користувача (без паролю)
    const preparedUser = user.toJSON();

    delete preparedUser.password;

    res.status(200).send({ data: preparedUser });
  } catch (error) {
    next(error);
  }
};

// TODO інші методи автентифікації
