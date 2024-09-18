import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder, verifyOrder, userOrders, updateStatus, listOrders } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware, placeOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware, userOrders)
orderRouter.post("/status",updateStatus)
orderRouter.get('/list', listOrders)
// orderRouter.post('/create-transaction', createTransaction);
// orderRouter.get('/payment-success', verifyTransaction);

export default orderRouter;