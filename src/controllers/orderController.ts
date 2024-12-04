import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { CreateOrderInput, UpdateOrderInput } from '../validators/orderValidator';
import { CustomError } from '../utils/customError';

// Place an order
export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId, productId, quantity } = req.body as CreateOrderInput;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new CustomError('User not found', 404);

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new CustomError('Product not found', 404);

    if (product.stock < quantity) throw new CustomError('Insufficient stock for this product', 400);

    const order = await prisma.$transaction(async (prisma) => {
      await prisma.product.update({
        where: { id: productId },
        data: { stock: product.stock - quantity },
      });

      return prisma.order.create({
        data: { userId, productId, quantity },
      });
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

// Get all orders
export const getOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orders = await prisma.order.findMany({
      include: { user: true, product: true },
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// Get recent orders (last 7 days)
export const getRecentOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  try {
    const recentOrders = await prisma.order.findMany({
      where: { orderDate: { gte: sevenDaysAgo } },
      include: { user: true, product: true },
    });
    res.json(recentOrders);
  } catch (error) {
    next(error);
  }
};

// Get orders by user
export const getOrdersByUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const orders = await prisma.order.findMany({
      where: { userId: parseInt(id, 10) },
      include: { product: true },
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// Get users by product
export const getUsersByProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const orders = await prisma.order.findMany({
      where: { productId: parseInt(id, 10) },
      include: { user: true },
    });

    const users = orders.map((order) => order.user);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Update an existing order
export const updateOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { quantity } = req.body as UpdateOrderInput;

  try {
    const existingOrder = await prisma.order.findUnique({
      where: { id: parseInt(id, 10) },
      include: { product: true },
    });

    if (!existingOrder) throw new CustomError('Order not found', 404);

    const product = existingOrder.product;
    const quantityDifference = quantity - existingOrder.quantity;

    if (quantityDifference > 0 && product.stock < quantityDifference) {
      throw new CustomError('Insufficient stock for this product', 400);
    }

    const updatedOrder = await prisma.$transaction(async (prisma) => {
      await prisma.product.update({
        where: { id: product.id },
        data: { stock: product.stock - quantityDifference },
      });

      return prisma.order.update({
        where: { id: parseInt(id, 10) },
        data: { quantity },
      });
    });

    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};
