const request = require('supertest');
const app = require('../src/index'); 
const mongoose = require('mongoose');

describe('User Registration and Login', () => {
  afterAll(() => {
    mongoose.connection.close();
  });

  test('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('User created successfully');
  });

  test('should not allow registration with duplicate email', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toMatch(/duplicate key error/);
  });

  test('should log in a registered user and return a token', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'john@example.com', password: 'password123' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('should not log in with incorrect password', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'john@example.com', password: 'wrongpassword' });
    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('Invalid credentials');
  });
});
