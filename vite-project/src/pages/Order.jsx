import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../components/Loader.jsx";

const Order = () => {
  const { backend_url, token } = useContext(ShopContext);
  const [loader, setLoading] = useState(false);

  const [orderData, setOrderData] = useState([]);

  const loadData = async () => {
    try {
      if (!token) {
        return null;
      }
      setLoading(true);
      const response = await axios.get(backend_url + "/api/order/userOrders", {
        headers: {
          token,
        },
      });
      if (response.data.success) {
        let allOrderItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrderItem.push(item);
          });
        });
        setOrderData(allOrderItem.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(" network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  return (
    <>
      <div className="md:mx-20 mx-5 mt-5">
        <div>
          <div className="flex justify-center mb-5 ml-2">
            <h1 className="text-left text-xl">
              MY <span className="font-bold">ORDERS</span>
            </h1>
            <div className="w-[70px] mt-3 ml-2 bg-gray-800 h-[2px] font-bold"></div>
          </div>
          {orderData.length === 0 ? (
            <div className="flex justify-center">
              <img src="https://cdn.dribbble.com/userupload/24238262/file/original-6b12fd6ca7a8dd70a94af6e0f14956d7.gif" alt="" className="sm:w-[350px] mix-blend-multiply" />
            </div>
          ) : (
            <div className="flex gap-2 flex-wrap justify-center">
              {loader ? (
                <Loader />
              ) : (
                orderData.map((item, index) => (
                  <div
                    key={index}
                    className="md:flex md:w-full w-[300px] md:flex-row md:flex-wrap md:justify-between p-1 border-2 my-2 border-gray-300"
                  >
                    <div className="md:flex  md:justify-start gap-3  md:w-[430px]">
                      <div className="flex justify-center">
                        <img
                          src={item.image[0]}
                          className="md:w-32 w-full md:h-fit h-72 items-center "
                          alt=""
                        />
                      </div>
                      <div className="mt-5 ">
                        <b>
                          <p className="text-center">{item.name}</p>
                        </b>
                        <div className="flex gap-4  justify-center sm:mt-3">
                          <p>Rs.{item.price} </p>
                          <p>Quantity : {item.quantity}</p>
                          <p>Size : {item.size}</p>
                        </div>
                        <p className="ml-2 md:ml-0">
                          <b>Date : </b>
                          <span className="text-gray-700">
                            {new Date(item.date).toDateString()}
                          </span>
                        </p>
                        <p className="ml-2 md:ml-0">
                          <b>Payment : </b>
                          <span className="text-gray-700">
                            {item.paymentMethod}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className=" md:mt-16 mt-2 ml-2 md:ml-0 h-fit flex gap-2 ">
                      <p className="w-3 h-3 mt-2 rounded-full bg-green-700"></p>
                      <p>{item.status}</p>
                    </div>
                    <div className="md:mt-16 mt-2 h-fit w-fit  mr-5 ml-2">
                      <p
                        onClick={loadData}
                        className="bg-pink-400 cursor-pointer px-2 py-1 rounded-md"
                      >
                        Track Order
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Order;
