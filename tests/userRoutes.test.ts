import request from 'supertest';
import app from '../src/app';

describe('User Routes', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: '9876543210',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('jane.doe@example.com');
  });

  it('should fetch a user by ID', async () => {
    const response = await request(app).get('/users/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  it('should update a user', async () => {
    const response = await request(app)
      .put('/users/1')
      .send({
        name: 'Jane Updated',
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Jane Updated');
  });

  it('should return 404 for a non-existent user', async () => {
    const response = await request(app).get('/users/9999');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });
});
