import axios from "axios";
import React, { useEffect, useState } from "react";
import { backend_url } from "../App";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const List = ({ token }) => {
  const [products, setproducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        const response = await axios.get(backend_url + "/api/product/list");
        setproducts(response.data.products);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, []);

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(backend_url + "/api/product/remove", {
        headers: { token },
        data: { id },
      });

      if (response.data.success) {
        toast.success("Removed Item");

        // Re-fetch product list
        const refreshed = await axios.get(backend_url + "/api/product/list");
        setproducts(refreshed.data.products);
      } else {
        toast.error(response.data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-product/${id}`);
  };

  return (
    <div className="">
      <h1 className="sm:text-3xl text-2xl">
        <b>
          All Product List
        </b>
      </h1>

      <div className="flex flex-wrap sm:justify-start justify-center mt-4 ">
        {loader ? (
          <Loader />
        ) : (
          products.map((items, index) => (
            <div
              className="flex sm:w-[250px] w-[145px] justify-center h-fit p-1 gap-1"
              key={index}
            >
              <div className="">
                <img
                  src={items.image}
                  alt=""
                  className="w-full sm:h-[230px]"
                />
                <p className="font-bold my-2 text-[13px] md:text-[16px] text-center">{items.name}</p>
                <div className="">
                  <p className=" text-left text-[13px] md:text-[16px]">
                    Category : {items.category}
                  </p>
                  <p className="text-left text-[13px] md:text-[16px]">
                     Sub-Category : {items.subCategory}
                  </p>
                </div>

                <p className="text-center font-bold text-[13px] md:text-[16px]">Price : ${items.price}</p>

                {/* Buttons below */}
                <div className="flex justify-between mt-3 px-2">
                  <button
                    onClick={() => handleUpdate(items._id)}
                    className="bg-green-700 hover:bg-green-500 text-[13px] md:text-[16px] text-white cursor-pointer sm:px-4 sm:py-2 px-2 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => removeProduct(items._id)}
                    className="bg-red-700 hover:bg-red-600 text-[13px] md:text-[16px] text-white rounded sm:px-4 cursor-pointer sm:py-2 px-2 py-1">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
