import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { backend_url } from "../App";
import { toast } from "react-toastify";
import { MdFindReplace } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

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

  const [imageFiles, setImageFiles] = useState([null, null, null, null]);
  const [imagePreviews, setImagePreviews] = useState([null, null, null, null]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${backend_url}/api/product/singleProduct`, {
          params: { id },
        });
        const product = res.data.OneProduct;

        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          OriginalPrice: product.OriginalPrice || "",
          category: product.category || "",
          subCategory: product.subCategory || "",
          sizes: product.sizes || [],
          bestSeller: !!product.bestSeller,
        });

        const previews = [null, null, null, null];
        if (Array.isArray(product.images)) {
          for (let i = 0; i < Math.min(4, product.images.length); i++) {
            previews[i] = product.images[i];
          }
        } else if (product.image) {
          previews[0] = product.image;
        }
        setImagePreviews(previews);
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
      // sizes input is comma-separated string -> array
      setFormData((prev) => ({
        ...prev,
        sizes: value.split(",").map((s) => s.trim()).filter(Boolean),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // handle selecting a file for a specific slot index (0..3)
  const handleImageChange = (index, file) => {
    if (!file) return;
    const updatedFiles = [...imageFiles];
    updatedFiles[index] = file;
    setImageFiles(updatedFiles);

    const updatedPreviews = [...imagePreviews];
    // revoke previous object URL if it was a local preview (best-effort)
    if (updatedPreviews[index] && updatedPreviews[index].startsWith?.("blob:")) {
      URL.revokeObjectURL(updatedPreviews[index]);
    }
    updatedPreviews[index] = URL.createObjectURL(file);
    setImagePreviews(updatedPreviews);
  };

  // optional: remove image from a slot (clear both preview and file)
  const removeImageSlot = (index) => {
    const updatedFiles = [...imageFiles];
    updatedFiles[index] = null;
    setImageFiles(updatedFiles);

    const updatedPreviews = [...imagePreviews];
    if (updatedPreviews[index] && updatedPreviews[index].startsWith?.("blob:")) {
      URL.revokeObjectURL(updatedPreviews[index]);
    }
    updatedPreviews[index] = null;
    setImagePreviews(updatedPreviews);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  try {
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

    const existingImages = imagePreviews.filter(
      (p) => p && !(typeof p === "string" && p.startsWith && p.startsWith("blob:"))
    );
    updateData.append("existingImages", JSON.stringify(existingImages));

    imageFiles.forEach((file) => {
      if (file) updateData.append("images", file);
    });

    const res = await axios.put(`${backend_url}/api/product/update`, updateData, {
      headers: {
        token,
      },
    });

    if (res.data.success) {
      toast.success("Product updated successfully");
      navigate("/list");
    } else {
      toast.error(res.data.msg || "Update failed");
    }
  } catch (err) {
    console.error("Update error:", err);
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};


  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
    <h1 className="font-semibold my-5 text-xl sm:text-3xl">
      Update Product
    </h1>
    <div className="flex md:justify-start">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <p className="text-xl mb-2 font-bold">Product Images</p>
          <div className="flex justify-center sm:justify-start flex-wrap gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className=" gap-2">
                <div className="w-32 h-32  rounded-md border">
                  {imagePreviews[i] ? (
                    <img
                      src={imagePreviews[i]}
                      alt={`preview-${i}`}
                      className="object-cover w-32 h-32 rounded-md border"
                    />
                  ) : (
                    <div className="text-sm text-gray-400">No image</div>
                  )}
                </div>

                <div className="flex ml-4 mt-2 items-center gap-2">
                  <label title="Replace Image"
                    className="cursor-pointer bg-black text-white border-gray-500 py-1 px-3 rounded text-2xl"
                    htmlFor={`image${i}`}
                  >
                    <MdFindReplace/>
                  </label>
                  <input
                    id={`image${i}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(i, e.target.files[0])}
                    className="hidden"
                  />
                  <button
                    type="button" title="Remove image"
                    onClick={() => removeImageSlot(i)}
                    className="cursor-pointer bg-black text-white border-gray-500 py-1 px-1.5 rounded text-2xl font-bold"
                  >
                    <RxCross2/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="font-semibold sm:text-xl">Title</span>
          <br />
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="md:w-full w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <span className="font-semibold sm:text-xl">Description</span>
          <br />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="flex gap-1">
          <div className="w-full">
            <span className="font-semibold sm:text-xl">Price :</span>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>

          <div className="w-full">
            <span className="font-semibold sm:text-xl"> Original Price :</span>
            <input
              type="number"
              name="OriginalPrice"
              placeholder="Original Price"
              value={formData.OriginalPrice}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>
        </div>

        <div className="flex gap-1 mt-2">
          <div className="w-full">
            <span className="font-semibold sm:text-xl">Category :</span>
            <br />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />
          </div>

          <div className="w-full">
            <span className="font-semibold sm:text-xl">Sub Category :</span>
            <br />
            <input
              type="text"
              name="subCategory"
              placeholder="Sub Category"
              value={formData.subCategory}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
        </div>

        <div>
          <span className="font-semibold sm:text-xl">Size :</span>
          <br />
          <input
            type="text"
            name="sizes"
            placeholder="Sizes (comma separated)"
            value={formData.sizes.join(", ")}
            onChange={handleChange}
            className="p-2 border rounded w-full mt-1"
          />
        </div>

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
          className="cursor-pointer bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
    </>
  );
};

export default Update;
