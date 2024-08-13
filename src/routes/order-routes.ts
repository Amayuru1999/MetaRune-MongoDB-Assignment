import { Router } from 'express';
import { OrderController } from '../controllers/order-controller';

const router = Router();

router.post('/create', OrderController.createOrder);
router.get('/', OrderController.getAllOrders);

export default router;
