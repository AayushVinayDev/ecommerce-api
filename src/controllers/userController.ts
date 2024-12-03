import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { CreateUserInput, UpdateUserInput } from '../validators/userValidator';
import { CustomError } from '../utils/customError';

// Create a new user
export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, email, phone } = req.body as CreateUserInput;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new CustomError('User with this email already exists', 400);
    }

    const user = await prisma.user.create({
      data: { name, email, phone },
    });

    res.status(201).json(user);
  } catch (error) {
    next(error); 
  }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!user) {
      throw new CustomError('User not found', 404);
    }

    res.json(user);
  } catch (error) {
    next(error); 
  }
};

// Update an existing user
export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const data = req.body as UpdateUserInput;

  try {
    const existingUser = await prisma.user.findUnique({ where: { id: parseInt(id, 10) } });
    if (!existingUser) {
      throw new CustomError('User not found', 404);
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id, 10) },
      data,
    });

    res.json(updatedUser);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      next(new CustomError('Email already exists', 400));
    } else {
      next(error);
    }
  }
};
