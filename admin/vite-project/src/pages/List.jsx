import axios from "axios";
import React, { useEffect, useState } from "react";
import { backend_url } from "../App";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const List = ({ token }) => {
  const [products, setproducts] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        const response = await axios.get(backend_url + "/api/product/list");
        console.log(response.data); // Log data to console
        setproducts(response.data.products); // Update state with data
      } catch (error) {
        console.error("Error fetching data: ", error); // Log error details
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

        // Re-fetching product list
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

  return (
    <>
      <div className="">
        <h1 className="text-3xl">
          <b>
            <i>All Product List </i>
          </b>
        </h1>
        <div className="flex flex-wrap sm:justify-start justify-center mt-4">
          {loader ? (
            <Loader />
          ) : (
            products.map((items, index) => (
              <div
                className="flex sm:w-[250px] w-[145px] justify-center h-fit p-1"
                key={index}
              >
                <div>
                  <img
                    src={items.image}
                    alt=""
                    className="w-full sm:h-[230px]"
                  />
                  <p className="font-bold  my-2 text-center">{items.name}</p>
                  <p className="font-medium text-center">
                    Category : {items.category}
                  </p>
                  <p className="  text-center">Price : ${items.price}</p>
                  <center>
                    <button
                      onClick={() => removeProduct(items._id)}
                      className="text-white bg-red-700 hover:bg-red-600 active:bg-red-900 active:scale-95 cursor-pointer my-3 rounded-md px-8 py-1"
                    >
                      Delete
                    </button>
                  </center>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default List;
