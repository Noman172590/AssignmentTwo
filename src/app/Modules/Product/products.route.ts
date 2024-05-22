import express from 'express';
import { productController } from './Products.Controller';
const router = express.Router();
// router controller function call must be all time so controller first time make

router.post('/', productController.createProduct);
router.get('/', productController.getAllProduct);
router.get('/:productId', productController.getSingleProduct);
router.put('/:productId', productController.productInformationUpdate);
router.delete('/:productId', productController.deleteProduct);


export const ProductRouter = router;
