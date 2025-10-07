import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { backend_url } from "../App";
import { toast } from "react-toastify";

const Update = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    OriginalPrice: "",
    category: "",
    subCategory: "",
    sizes: [],
    bestSeller: false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch single product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${backend_url}/api/product/singleProduct`,
          {
            params: { id },
          }
        );
        const product = res.data.OneProduct;

        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          OriginalPrice: product.OriginalPrice,
          category: product.category,
          subCategory: product.subCategory,
          sizes: product.sizes || [],
          bestSeller: product.bestSeller,
        });

        setImagePreview(product.image);
      } catch (err) {
        console.error("Error fetching product:", err);
        toast.error("Failed to load product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "sizes") {
      setFormData((prev) => ({
        ...prev,
        sizes: value.split(",").map((s) => s.trim()),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = new FormData();
    updateData.append("id", id);
    updateData.append("name", formData.name);
    updateData.append("description", formData.description);
    updateData.append("price", formData.price);
    updateData.append("OriginalPrice", formData.OriginalPrice);
    updateData.append("category", formData.category);
    updateData.append("subCategory", formData.subCategory);
    updateData.append("sizes", JSON.stringify(formData.sizes));
    updateData.append("bestSeller", formData.bestSeller);

    if (imageFile) {
      updateData.append("image1", imageFile);
    }

    try {
      const res = await axios.put(
        `${backend_url}/api/product/update`,
        updateData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Product updated successfully");
        navigate("/list");
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="w-full sm:w-[500px] ">
      <h2 className="text-2xl font-bold mb-6 ">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {imagePreview && (
          <div className="w-full mb-4">
            <p className="text-xl mb-1 font-bold">Product Image:</p>
            <img
              src={imagePreview}
              alt="Current"
              className=" h-auto max-h-[250px] object-contain mt-5 rounded"
            />
          </div>
        )}
        <input
          type="file"
          name="image1"
          accept="image/*"
          onChange={handleImageChange}
          className="bg-gray-200 w-full py-2 px-2 border-gray-400 border-2 cursor-pointer"
        />
        <div className="md:flex md:gap-10 my-2 w-full"></div>
        <span className="font-semibold sm:text-xl  ">Title</span>
        <br />
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className=" md:w-full w-full p-2 border rounded"
          required
        />{" "}
        <br />
        <span className="font-semibold sm:text-xl ">Description</span>
        <br />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className=" w-full p-2 border rounded"
          required
        ></textarea>
        <br />
        <br />
        <div className="flex gap-1 ">
          <div className="w-full">
            <span className="font-semibold sm:text-xl ">Price : </span>

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full  p-2 border rounded"
              required
            />
          </div>

          <div className="w-full">
            <span className="font-semibold sm:text-xl ">
              {" "}
              Original Price :{" "}
            </span>
            <input
              type="number"
              name="OriginalPrice"
              placeholder="Original Price"
              value={formData.OriginalPrice}
              onChange={handleChange}
              className="w-full  p-2 border rounded"
              required
            />
          </div>
        </div>
        <div className="flex gap-1 mt-2">
          <div className="w-full">
            <span className="font-semibold sm:text-xl ">Category : </span>
            <br />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full  p-2 border rounded"
            />
          </div>
          <div className="w-full">
            <span className="font-semibold sm:text-xl ">Sub Category : </span>
            <br />
            <input
              type="text"
              name="subCategory"
              placeholder="Sub Category"
              value={formData.subCategory}
              onChange={handleChange}
              className="w-full  p-2 border rounded"
            />
          </div>
        </div>
        <span className="font-semibold sm:text-xl ">Size : </span>
        <br />
        <input
          type="text"
          name="sizes"
          placeholder="Sizes (comma separated)"
          value={formData.sizes.join(", ")}
          onChange={handleChange}
          className=" p-2 border rounded"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="bestSeller"
            checked={formData.bestSeller}
            onChange={handleChange}
          />
          <label>Best Seller</label>
        </div>
        <button
          type="submit"
          className="cursor-pointer bg-blue-600 text-white py-2 px-20 rounded hover:bg-blue-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default Update;
