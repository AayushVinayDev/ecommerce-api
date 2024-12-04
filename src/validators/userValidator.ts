import { z } from 'zod';

// Schema for creating a user
export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
});

// Schema for updating a user (partial updates allowed)
export const updateUserSchema = z.object({
  name: z.string().min(1, 'Name must be at least 1 character').optional(),
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().min(10, 'Phone number must be at least 10 characters').optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
