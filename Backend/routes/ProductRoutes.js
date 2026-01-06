// src/routes/productRoute.js
import express from "express";
import {
  addProduct,
  deleteProduct,
  listProduct,
  singleProduct,
  updateProduct,
} from "../controller/Product_controller.js";
import upload from "../middleware/Multer.js";
import adminAuth from "../middleware/AdminAuth.js";

const productRoute = express.Router();


productRoute.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "images", maxCount: 4 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);


productRoute.put(
  "/update",
  adminAuth,
  upload.fields([
    { name: "images", maxCount: 4 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  updateProduct
);

productRoute.delete("/remove", adminAuth, deleteProduct);
productRoute.get("/singleProduct", singleProduct);
productRoute.get("/list", listProduct);

export default productRoute;
