import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/Product_model.js";
import UserModel from "../models/User_Model.js";

// function for create product
const addProduct = async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        OriginalPrice,
        subCategory,
        category,
        sizes,
        bestSeller,
      } = req.body;
  
      const image1 = req.files.image1[0];
  
      // Upload the image and wait for the URL
      const result = await cloudinary.uploader.upload(image1.path, {
        resource_type: 'image',
      });
  
      const Product_data = {
        name,
        description,
        price: Number(price),
        OriginalPrice: Number(OriginalPrice),
        subCategory, 
        category,
        sizes: JSON.parse(sizes),
        bestSeller: bestSeller === 'true',
        image: result.secure_url, 
        date: Date.now(),
      };
  
      const product = new productModel(Product_data);
      await product.save();
  
      res.json({ success: true, msg: 'Product added successfully.' });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

  // function for update product
const updateProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      price,
      OriginalPrice,
      subCategory,
      category,
      sizes,
      bestSeller,
    } = req.body;

    let updatedFields = {
      name,
      description,
      price: Number(price),
      OriginalPrice: Number(OriginalPrice),
      subCategory,
      category,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === 'true',
      date: Date.now(),
    };

    // Check if a new image is provided
    if (req.files && req.files.image1 && req.files.image1[0]) {
      const image1 = req.files.image1[0];
      const result = await cloudinary.uploader.upload(image1.path, {
        resource_type: 'image',
      });

      updatedFields.image = result.secure_url;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );

    if (!updatedProduct) {
      return res.json({ success: false, msg: "Product not found" });
    }

    res.json({ success: true, msg: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

  
// function for list product
const listProduct = async (req, res) => {

  try {
    const products = await productModel.find({});
    res.json({success:true, products});
  } catch (error) {
    console.log(error);
    res.json({success:false, msg:error});
  }

};

// function for delete product
const deleteProduct = async (req, res) => {

 try {
  
      await productModel.findByIdAndDelete(req.body.id);
      res.json({success:true, msg:"Product deleted successfully."});

 } catch (error) {
   console.log(error);
   res.json({success:false, msg:error});
 }

};

// function for single product
const singleProduct = async (req, res) => {
  try {
    const { id } = req.query; 

    if (!id) {
      return res.status(400).json({ success: false, msg: "Product ID is required" });
    }

    const OneProduct = await productModel.findById(id);
    if (!OneProduct) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }

    res.json({ success: true, OneProduct });
  } catch (error) {
    console.log("Error in singleProduct:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};


export { addProduct, listProduct, deleteProduct, singleProduct, updateProduct };
