const request = require('supertest');
const yup = require('yup');
const app = require('../app');
const { sequelize } = require('../db/models');

function createUserObject(key) {
  return {
    firstName: `user`,
    lastName: `test`,
    isMale: true,
    email: `mail${key}@mail.com`,
    password: '12345admin',
    passwordRepeat: '12345admin',
  };
}

const SUCCESS_AUTH_CHEMA = yup.object({
  user: yup.object().required(),
  tokenPair: yup.object({
    accessToken: yup.string().required(),
    refreshToken: yup.string().required(),
  }),
});

describe(`Тести пов'язані з реєстрацією `, () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('при отриманні корректних даних реєстрація має відбутися з кодом 201', async () => {
    const response = await request(app)
      .post('/auth/registration')
      .send(createUserObject(1));

    expect(response.statusCode).toBe(201);
  });

  test(`при отриманні корректних даних реєстрація повертає об'єкт юзера та пару токенів`, async () => {
    const response = await request(app)
      .post('/auth/registration')
      .send(createUserObject(2));

    expect(SUCCESS_AUTH_CHEMA.isValidSync(response.body.data)).toBe(true);
  });

  test(`при повторній реєстрації має відбутися помилка`, async () => {
    const response = await request(app)
      .post('/auth/registration')
      .send(createUserObject(2));

    expect(response.statusCode).toBe(500);
    expect(SUCCESS_AUTH_CHEMA.isValidSync(response.body.data)).toBe(false);
  });
});
