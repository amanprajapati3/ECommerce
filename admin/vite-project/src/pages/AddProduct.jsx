import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backend_url } from "../App";
import { toast } from "react-toastify"

const AddProduct = ({token}) => {
  const [image1, setImage1] = useState(null);
  const [name, setProduct_name] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubcategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState("");
  const [Bestseller, setBestseller] = useState(false);
  const [loading, setLoading] = useState(false);

  const SubmitHandler = async (e) => {
     setLoading(true);
    e.preventDefault();
     console.log(name, description, category, subCategory, price, sizes, Bestseller );
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("Bestseller", Bestseller);
      image1 && formData.append("image1", image1);
 
      const response = await axios.post(
        backend_url + "/api/product/add",
        formData, {headers: {token}}
      );
      console.log(response.data);
      toast.success("Product added successfully!");

      // Reset form state
      setImage1(null);
      setProduct_name("");
      setDescription("");
      setCategory("Men");
      setSubcategory("Topwear");
      setPrice("");
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
      <div className="flex  md:justify-start">
        <form action="" className="" onSubmit={SubmitHandler}>
          <h1 className="sm:text-[20px]">Upload Image : </h1>
          <div className="flex justify-center">
            <label htmlFor="image1" className="my-5 w-fit cursor-pointer">
              <img
                src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                className="w-32"
                alt=""
              />
              <input
                type="file"
                id="image1"
                onChange={(e) => setImage1(e.target.files[0])}
                required
                className="w-fit"
                hidden
              />
            </label>
          </div>
          <h1 className="sm:text-[20px]">Product Name : </h1>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            required
            onChange={(e) => setProduct_name(e.target.value)}
            className="border-2 border-gray-400 hover:bg-gray-200 focus:bg-gray-300 text-gray-800  md:w-full w-[135%] py-2 pl-5 outline-none my-3"
          />

          <h1 className="sm:text-[20px]">Description : </h1>
          <textarea
            name=""
            id=""
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write content here"
            className="border-2 border-gray-400 hover:bg-gray-200 focus:bg-gray-300 text-gray-800  md:w-full w-[135%] py-2 pl-5 outline-none my-3"
          ></textarea>

          <div className="sm:flex gap-5 flex-wrap w-full">
            <div>
              <h1 className="sm:text-[20px]">Product Category :</h1>
              <select
                name=""
                id=""
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
                className="border-gray border-2 sm:py-2 py-1 mb-2 w-[100px] border-gray-400 mt-3 sm:w-[100px]"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div>
              <h1 className="sm:text-[20px]">Sub Category :</h1>
              <select
                name=""
                id=""
                required
                value={subCategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="border-gray border-2 sm:py-2 py-1 mb-2 w-[100px] border-gray-400 mt-3 sm:w-[100px]"
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>
            <div>
              <h1 className="sm:text-[20px]">Product Price :</h1>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border-2 border-gray-400 hover:bg-gray-200 focus:bg-gray-300 text-gray-800  md:w-full w-[135%] sm:py-2 py-1 mt-1 pl-5 outline-none my-3"
              />
            </div>
          </div>
          <h1 className="sm:text-[20px]">Product Size :</h1>
          <div className="mt-5 flex flex-wrap gap-2 my-3">
            <input
              type="button"
              value={"S"}
              onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S"): [...prev, "S"])}
              className={
                sizes.includes("S")
                  ? "bg-blue-200 border-2 border-black cursor-pointer py-1 px-3  "
                  : "bg-blue-200 cursor-pointer py-1 px-3 border-2 border-transparent rounded-"
              }
            />
            <input
              type="button"
              value={"M"}
              onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M"): [...prev, "M"])}
              className={
                sizes.includes("M")
                  ? "bg-blue-200 border-2 border-black cursor-pointer py-1 px-3 "
                  : "bg-blue-200 cursor-pointer py-1 px-3 border-2 border-transparent rounded-"
              }
            />
            <input
              type="button"
              value={"L"} 
              onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L"): [...prev, "L"])}
              className={
                sizes.includes("L")
                  ? "bg-blue-200 border-2 border-black cursor-pointer py-1 px-3 "
                  : "bg-blue-200 cursor-pointer py-1 px-3 border-2 border-transparent rounded-"
              }
            />
            <input
              type="button"
              value={"XL"}
              onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL"): [...prev, "XL"])}
              className={
                sizes.includes("XL")
                  ? "bg-blue-200 border-2 border-black cursor-pointer py-1 px-3 "
                  : "bg-blue-200 cursor-pointer py-1 px-3 border-2 border-transparent rounded-"
              }
            />
            <input
              type="button"
              value={"XXL"}
              onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL"): [...prev, "XXL"])}
              className={
                sizes.includes("XXL")
                  ? "bg-blue-200 border-2 border-black cursor-pointer py-1 px-3 "
                  : "bg-blue-200 cursor-pointer py-1 px-3 border-2 border-transparent rounded-"
              }
            />
          </div>
          <div className="flex gap-3 mt-2">
            <input
              onChange={() => setBestseller(!Bestseller)}
              checked={Bestseller}
              type="checkbox"
              className="checkbox"
            />
            <h1 className="sm:text-[18px]">Add to Bestseller</h1>
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
      </div>  </>
  );
};

export default AddProduct;
