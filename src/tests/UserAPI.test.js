const request = require('supertest');
const app = require('../app');
const sequelize = require('../../db/sequelize');
const User = require('../models/user');

afterAll(async () => {
  await sequelize.close();
});

afterEach(async () => {
  await User.destroy({ where: {} });
});

describe('User API', () => {
  test('Should add user, encrypt the password and return token', async () => {
    const response = await request(app)
      .post('/api/user')
      .send({
        email: 'test@test.com',
        password: 'passtest123',
      })
      .expect(201);

    const user = await User.findByPk(response.body.user.id);

    expect(user).not.toBeNull();
    expect(user.password).not.toBe('passtest123');
    expect(response.body).toHaveProperty('token');
  });

  test('Should not add user with missing parameters', async () => {
    await request(app)
      .post('/api/user')
      .send({
        password: 'passtest123',
      })
      .expect(400);

    await request(app)
      .post('/api/user')
      .send({
        email: 'test@test.com',
      })
      .expect(400);
  });

  test('Should not add a user if email is in use', async () => {
    await request(app)
      .post('/api/user')
      .send({
        email: 'test@test.com',
        password: 'passtest123',
      })
      .expect(201);

    await request(app)
      .post('/api/user')
      .send({
        email: 'test@test.com',
        password: 'passtest123',
      })
      .expect(400);
  });

  test('Should return status 500 if occurs an error on server', async () => {
    jest.spyOn(User, 'create').mockImplementationOnce(() => { throw new Error(); });

    await request(app)
      .post('/api/user')
      .send({
        email: 'test@test.com',
        password: 'passtest123',
      })
      .expect(500);
  });

  test('Should generate another token if user already has one', async () => {
    const user = await User.create({
      email: 'test@test.com',
      password: 'passtest123',
    });

    await user.generateAuthToken();
    await user.generateAuthToken();
    expect(user.tokens.length).toBe(2);
  });
});
