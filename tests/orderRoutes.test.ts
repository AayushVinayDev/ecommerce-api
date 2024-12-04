import request from 'supertest';
import app from '../src/app';

describe('Order Routes', () => {
  let userId: number;
  let productId: number;
  let orderId: number;

  beforeAll(async () => {
    const userResponse = await request(app).post('/users').send({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '9876543210',
    });
    userId = userResponse.body.id;

    const productResponse = await request(app).post('/products').send({
      name: 'Tablet',
      category: 'Electronics',
      price: 500,
      stock: 10,
    });
    productId = productResponse.body.id;
  });

  it('should place an order', async () => {
    const response = await request(app).post('/orders').send({
      userId,
      productId,
      quantity: 2,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    orderId = response.body.id;
  });

  it('should fetch all orders', async () => {
    const response = await request(app).get('/orders');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should update an order', async () => {
    const response = await request(app).put(`/orders/${orderId}`).send({
      quantity: 3,
    });

    expect(response.status).toBe(200);
    expect(response.body.quantity).toBe(3);
  });

  it('should return 400 for insufficient stock when updating', async () => {
    const response = await request(app).put(`/orders/${orderId}`).send({
      quantity: 20, // More than available stock
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Insufficient stock for this product');
  });
});
