import { z } from 'zod';

// Schema for creating a product
export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().min(0, 'Price must be greater than or equal to 0'),
  stock: z.number().int().min(0, 'Stock must be a non-negative integer'),
});

// Schema for updating a product
export const updateProductSchema = z.object({
  name: z.string().min(1, 'Name must be at least 1 character').optional(),
  category: z.string().min(1, 'Category must be at least 1 character').optional(),
  price: z.number().min(0, 'Price must be greater than or equal to 0').optional(),
  stock: z.number().int().min(0, 'Stock must be a non-negative integer').optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
