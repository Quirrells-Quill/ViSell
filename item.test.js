const request = require('supertest');
const app = require('../src/index'); 
let token;

beforeAll(async () => {
  const response = await request(app)
    .post('/api/auth/login')
    .send({ email: 'john@example.com', password: 'password123' });
  token = response.body.token;
});

describe('Item Management', () => {
  test('should create a new item with valid data', async () => {
    const response = await request(app)
      .post('/api/items')
      .set('Authorization', token)
      .send({
        name: 'Used Calculator',
        description: 'A scientific calculator in good condition',
        price: 500,
        sellerId: 'user_id_placeholder',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Used Calculator');
  });

  test('should reject item creation without authorization', async () => {
    const response = await request(app)
      .post('/api/items')
      .send({
        name: 'Used Textbook',
        description: 'Textbook for Mathematics',
        price: 300,
      });
    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('Access denied');
  });

  test('should retrieve the list of all items', async () => {
    const response = await request(app).get('/api/items');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('should return an error for missing item name', async () => {
    const response = await request(app)
      .post('/api/items')
      .set('Authorization', token)
      .send({
        description: 'Textbook for Mathematics',
        price: 300,
        sellerId: 'user_id_placeholder',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toMatch(/name is required/);
  });
});
