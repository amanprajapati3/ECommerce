import express from "express";
import {
  addProduct,
  deleteProduct,
  listProduct,
  singleProduct,
} from "../controller/Product_controller.js";
import upload from "../middleware/Multer.js";
import adminAuth from "../middleware/AdminAuth.js";

const productRoute = express.Router();

productRoute.post(
  '/add',
  upload.fields([
    { name: "image1", maxCount: 1 },
  ]), adminAuth,
  addProduct
);
productRoute.delete('/remove', adminAuth, deleteProduct);
productRoute.get('/singleProduct', singleProduct);
productRoute.get('/list', listProduct);

export default productRoute;
