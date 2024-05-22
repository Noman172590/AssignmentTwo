import express from 'express';
import { orderController,} from './Order.Controller';
import { OrderService } from './Order.Service';
const router = express.Router();

//product
router.post('/', orderController.createOrder);
router.get('/',orderController.getAllOrder );
router.get('/:email', OrderService.getSingleOrderFromBD);

export const OrderRouter = router;
