describe('Validation for Missing Fields in Item Creation', () => {
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
  
    test('should return an error for missing item price', async () => {
      const response = await request(app)
        .post('/api/items')
        .set('Authorization', token)
        .send({
          name: 'Used Textbook',
          description: 'Textbook for Mathematics',
          sellerId: 'user_id_placeholder',
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toMatch(/price is required/);
    });
  });
  
