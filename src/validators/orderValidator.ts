import { z } from 'zod';

// Schema for placing an order
export const createOrderSchema = z.object({
  userId: z.number().int().min(1, 'Invalid user ID'),
  productId: z.number().int().min(1, 'Invalid product ID'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});

// Schema for updating an order
export const updateOrderSchema = z.object({
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;
