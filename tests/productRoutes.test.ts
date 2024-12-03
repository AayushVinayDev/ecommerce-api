import request from 'supertest';
import app from '../src/app';

describe('Product Routes', () => {
  let productId: number;

  it('should create a new product', async () => {
    const response = await request(app)
      .post('/products')
      .send({
        name: 'Laptop',
        category: 'Electronics',
        price: 1200,
        stock: 50,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Laptop');
    productId = response.body.id;
  });

  it('should fetch all products', async () => {
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should update an existing product', async () => {
    const response = await request(app)
      .put(`/products/${productId}`)
      .send({
        name: 'Updated Laptop',
        price: 1100,
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Laptop');
    expect(response.body.price).toBe(1100);
  });

  it('should return total stock quantity', async () => {
    const response = await request(app).get('/products/stock/total');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('totalStock');
    expect(response.body.totalStock).toBeGreaterThan(0);
  });

  it('should return 404 for a non-existent product update', async () => {
    const response = await request(app).put('/products/9999').send({ name: 'Non-existent Product' });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Product not found');
  });
});
