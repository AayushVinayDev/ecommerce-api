import { Router } from 'express';
import { createProduct, getProducts, updateProduct, getTotalStock } from '../controllers/productController';
import validate from '../middlewares/validate';
import { createProductSchema, updateProductSchema } from '../validators/productValidator';

const router = Router();

// Create a product
router.post('/', validate(createProductSchema), createProduct);

// Get all products
router.get('/', getProducts);

// Update a product
router.put('/:id', validate(updateProductSchema), updateProduct);

// Get total stock quantity
router.get('/stock/total', getTotalStock);

export default router;
