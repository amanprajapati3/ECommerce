
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import productModel from "../models/Product_model.js";


const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);

    // Disk path
    if (file.path) {
      cloudinary.uploader
        .upload(file.path, { resource_type: "image" })
        .then((resp) => resolve(resp.secure_url))
        .catch((err) => reject(err));
      return;
    }

    // tempFilePath
    if (file.tempFilePath) {
      cloudinary.uploader
        .upload(file.tempFilePath, { resource_type: "image" })
        .then((resp) => resolve(resp.secure_url))
        .catch((err) => reject(err));
      return;
    }

    if (file.buffer) {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
      return;
    }

    // Unknown file shape
    reject(new Error("Unsupported file object for upload"));
  });
};

/** Collect up to 4 files from req.files (unchanged logic) */
const collectFilesFromReq = (req) => {
  const files = [];

  if (req.files && Array.isArray(req.files.images) && req.files.images.length) {
    files.push(...req.files.images.slice(0, 4));
  } else if (req.files && typeof req.files === "object") {
    ["image1", "image2", "image3", "image4"].forEach((key) => {
      if (req.files[key] && Array.isArray(req.files[key]) && req.files[key][0]) {
        files.push(req.files[key][0]);
      }
    });

    Object.keys(req.files).forEach((k) => {
      if (
        Array.isArray(req.files[k]) &&
        req.files[k][0] &&
        !["images", "image1", "image2", "image3", "image4"].includes(k)
      ) {
        const remaining = 4 - files.length;
        if (remaining > 0) files.push(...req.files[k].slice(0, remaining));
      }
    });
  }

  return files.slice(0, 4);
};

// CREATE product
const addProduct = async (req, res) => {
  try {
    console.log("addProduct -> req.files keys:", Object.keys(req.files || {}));

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

    const files = collectFilesFromReq(req);
    let images = [];

    if (files.length > 0) {
      const uploads = await Promise.all(
        files.map((file) =>
          uploadToCloudinary(file).catch((err) => {
            console.error("cloudinary upload error:", err);
            return null;
          })
        )
      );
      images = uploads.filter(Boolean).slice(0, 4);
    }

    const Product_data = {
      name,
      description,
      price: Number(price),
      OriginalPrice: Number(OriginalPrice),
      subCategory,
      category,
      sizes: sizes ? JSON.parse(sizes) : [],
      bestSeller: bestSeller === "true" || bestSeller === true,
      images, // array of Cloudinary secure_url
      date: Date.now(),
    };

    const product = new productModel(Product_data);
    await product.save();

    res.json({ success: true, msg: "Product added successfully.", product });
  } catch (error) {
    console.error("addProduct error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE product
const updateProduct = async (req, res) => {
  try {
    console.log("updateProduct -> req.files keys:", Object.keys(req.files || {}));

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

    if (!id) {
      return res.status(400).json({ success: false, msg: "Product id is required" });
    }

    const updatedFields = {
      name,
      description,
      price: price !== undefined ? Number(price) : undefined,
      OriginalPrice: OriginalPrice !== undefined ? Number(OriginalPrice) : undefined,
      subCategory,
      category,
      sizes: sizes ? JSON.parse(sizes) : undefined,
      bestSeller: bestSeller === "true" || bestSeller === true,
      date: Date.now(),
    };

    const files = collectFilesFromReq(req);
    if (files.length > 0) {
      const uploads = await Promise.all(
        files.map((file) =>
          uploadToCloudinary(file).catch((err) => {
            console.error("cloudinary upload error:", err);
            return null;
          })
        )
      );
      const images = uploads.filter(Boolean).slice(0, 4);
      updatedFields.images = images;
    }

    // Remove undefined fields so they don't overwrite existing data
    Object.keys(updatedFields).forEach((k) => {
      if (updatedFields[k] === undefined) delete updatedFields[k];
    });

    const updatedProduct = await productModel.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }

    res.json({ success: true, msg: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error("updateProduct error:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Remaining handlers unchanged (list, delete, single)
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error("listProduct error:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ success: false, msg: "Product id required" });

    await productModel.findByIdAndDelete(id);
    res.json({ success: true, msg: "Product deleted successfully." });
  } catch (error) {
    console.error("deleteProduct error:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ success: false, msg: "Product ID is required" });

    const OneProduct = await productModel.findById(id);
    if (!OneProduct) return res.status(404).json({ success: false, msg: "Product not found" });

    res.json({ success: true, OneProduct });
  } catch (error) {
    console.error("singleProduct error:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

export { addProduct, listProduct, deleteProduct, singleProduct, updateProduct };
