import express from 'express';
import * as controller from '../controllers/productController.js';
import {
  validateProductId,
  validateCreateProduct,
  validateUpdateProduct,
  validateProductQuery,
} from '../middleware/productValidation.js';

const router = express.Router();

router.get('/', validateProductQuery, controller.getAllProducts);
router.get('/:id', validateProductId, controller.getProductById);
router.post('/', validateCreateProduct, controller.createProduct);
router.put(
  '/:id',
  validateProductId,
  validateUpdateProduct,
  controller.updateProduct,
);
router.delete('/:id', validateProductId, controller.deleteProduct);

export default router;
