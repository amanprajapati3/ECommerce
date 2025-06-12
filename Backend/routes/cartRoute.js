import express from 'express'
import { addToCart, updateCart, userCartData } from '../controller/cartController.js';
import authUser from '../middleware/auth.js';

const cartRoute = express.Router();

cartRoute.post('/addToCart', authUser, addToCart);
cartRoute.post('/update', authUser, updateCart);
cartRoute.post('/get', authUser, userCartData);

export default cartRoute;