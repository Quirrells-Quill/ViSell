describe('Retrieve All Items', () => {
    test('should retrieve the list of all items', async () => {
      const response = await request(app).get('/api/items');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true); // Expect an array of items
    });
  });
  
