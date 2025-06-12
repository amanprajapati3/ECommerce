import express from 'express';
import { allOrder, OrderData, placeOrder, razorPayMethod, stripeMethod, updataOrderStatus, verifyStripe, } from '../controller/orderController.js';
import adminAuth from '../middleware/AdminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// for admin panel
orderRouter.post('/allOrder',adminAuth, allOrder);
orderRouter.post('/updateOrder',adminAuth, updataOrderStatus);

// for user panel
orderRouter.post('/cash',authUser, placeOrder);
orderRouter.post('/stripe', authUser, stripeMethod);
orderRouter.post('/razorpay', authUser, razorPayMethod);

// userOrder
orderRouter.get('/userOrders', authUser, OrderData);

// verifyOrders
orderRouter.post('/verifyStripe',authUser, verifyStripe);

export default orderRouter;