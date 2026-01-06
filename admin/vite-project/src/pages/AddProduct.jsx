import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backend_url } from "../App";
import { toast } from "react-toastify";

const AddProduct = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]); // 4 images
  const [name, setProduct_name] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubcategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [OriginalPrice, setOriginalPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [Bestseller, setBestseller] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle image change
  const handleImageChange = (index, file) => {
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("OriginalPrice", OriginalPrice);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestSeller", Bestseller);

      // Append images
      images.forEach((img) => {
        if (img) formData.append("images", img);
      });

      const response = await axios.post(
        backend_url + "/api/product/add",
        formData,
        { headers: { token } }
      );

      toast.success("Product added successfully!");

      // Reset form
      setImages([null, null, null, null]);
      setProduct_name("");
      setDescription("");
      setCategory("Men");
      setSubcategory("Topwear");
      setPrice("");
      setOriginalPrice("");
      setSizes([]);
      setBestseller(false);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex md:justify-start">
        <form onSubmit={SubmitHandler}>
          <h1 className="sm:text-[20px] mb-2">Upload Images</h1>

          <div className="flex justify-center sm:justify-start flex-wrap gap-4">
            {images.map((img, i) => (
              <label key={i} htmlFor={`image${i}`} className="cursor-pointer">
                <img
                  src={img ? URL.createObjectURL(img) : assets.upload_area}
                  className="w-32 h-32 object-cover rounded-md border"
                  alt=""
                />
                <input
                  type="file"
                  id={`image${i}`}
                  hidden
                  onChange={(e) => handleImageChange(i, e.target.files[0])}
                />
              </label>
            ))}
          </div>

          <h1 className="sm:text-[20px] mt-5">Product Name :</h1>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            required
            onChange={(e) => setProduct_name(e.target.value)}
            className="border-2 border-gray-400 hover:bg-gray-200 focus:bg-gray-300 text-gray-800 w-full py-2 pl-5 outline-none my-3"
          />

          <h1 className="sm:text-[20px]">Description :</h1>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write content here"
            className="border-2 border-gray-400 hover:bg-gray-200 focus:bg-gray-300 text-gray-800 w-full py-2 pl-5 outline-none my-3"
          ></textarea>

          <div className="flex w-full gap-2 mt-3">
            <div className="w-full">
              <h1 className="sm:text-[20px]">Product Category :</h1>
              <select
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
                className="border-2 border-gray-400 py-2 mt-2 w-full"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div className="w-full">
              <h1 className="sm:text-[20px]">Sub Category :</h1>
              <select
                value={subCategory}
                required
                onChange={(e) => setSubcategory(e.target.value)}
                className="border-2 border-gray-400 py-2 mt-2 w-full"
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 w-full mt-5">
            <div className="w-full">
              <h1 className="sm:text-[20px]">Product Price :</h1>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border-2 border-gray-400 py-2 w-full pl-5 my-3"
              />
            </div>

            <div className="w-full">
              <h1 className="sm:text-[20px]">Original Price :</h1>
              <input
                type="number"
                required
                value={OriginalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="border-2 border-gray-400 py-2 w-full pl-5 my-3"
              />
            </div>
          </div>

          <h1 className="sm:text-[20px] mt-3">Product Size :</h1>
          <div className="flex gap-2 mt-3 flex-wrap">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes(size)
                      ? prev.filter((s) => s !== size)
                      : [...prev, size]
                  )
                }
                className={`py-1 px-3 border ${
                  sizes.includes(size)
                    ? "bg-blue-300 border-black"
                    : "bg-blue-100 border-transparent"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-4">
            <input
              type="checkbox"
              checked={Bestseller}
              onChange={() => setBestseller(!Bestseller)}
            />
            <span>Add to Bestseller</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="my-5 text-white bg-black hover:bg-gray-800 active:bg-gray-950 cursor-pointer sm:py-2 sm:px-20 px-24 py-1 flex justify-center items-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "ADD"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
