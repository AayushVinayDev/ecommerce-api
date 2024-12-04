import { Router } from 'express';
import {
  createOrder,
  getOrders,
  getRecentOrders,
  getOrdersByUser,
  getUsersByProduct,
  updateOrder,
} from '../controllers/orderController';
import validate from '../middlewares/validate';
import { createOrderSchema, updateOrderSchema } from '../validators/orderValidator';

const router = Router();

// Place an order
router.post('/', validate(createOrderSchema), createOrder);

// Get all orders
router.get('/', getOrders);

// Get recent orders
router.get('/recent', getRecentOrders);

// Get orders by user
router.get('/user/:id', getOrdersByUser);

// Get users by product
router.get('/product/:id', getUsersByProduct);

// Update an existing order
router.put('/:id', validate(updateOrderSchema), updateOrder);

export default router;
