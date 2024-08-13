import express from 'express';
import { getOrders } from '../controllers/orderControllers';

const router = express.Router();

router.get('/orders', getOrders);

export default router;
