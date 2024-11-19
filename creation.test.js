let token;

beforeAll(async () => {
  const response = await request(app)
    .post('/api/auth/login')
    .send({ email: 'john@example.com', password: 'password123' });
  token = response.body.token;
});

describe('Create Item', () => {
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
});
