import { Router } from 'express';
import { createUser, getUserById, updateUser } from '../controllers/userController';
import validate from '../middlewares/validate';
import { createUserSchema, updateUserSchema } from '../validators/userValidator';

const router = Router();

// Create a user
router.post('/', validate(createUserSchema), createUser);

// Get a user by ID
router.get('/:id', getUserById);

// Update a user
router.put('/:id', validate(updateUserSchema), updateUser);

export default router;
