import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { CreateProductInput, UpdateProductInput } from '../validators/productValidator';
import { CustomError } from '../utils/customError';

// Create a new product
export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, category, price, stock } = req.body as CreateProductInput;

  try {
    const product = await prisma.product.create({
      data: { name, category, price, stock },
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// Get all products
export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// Update an existing product
export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const data = req.body as UpdateProductInput;

  try {
    const existingProduct = await prisma.product.findUnique({ where: { id: parseInt(id, 10) } });
    if (!existingProduct) {
      throw new CustomError('Product not found', 404);
    }

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id, 10) },
      data,
    });

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// Get total stock quantity for all products
export const getTotalStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const totalStock = await prisma.product.aggregate({
      _sum: { stock: true },
    });

    res.json({ totalStock: totalStock._sum.stock || 0 });
  } catch (error) {
    next(error);
  }
};
