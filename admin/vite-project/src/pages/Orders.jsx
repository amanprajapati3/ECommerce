import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backend_url } from "../App";
import { assets } from "../assets/admin_assets/assets";
import Loader from "../components/Loader";

const Orders = ({ token }) => {
  const [AllOrders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      setLoader(true);
      const response = await axios.post(
        backend_url + "/api/order/allOrder",
        {},
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        setOrders(response.data.AllOrders.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setLoader(false);
    }
  };

  const UpdateStatus = async (event, orderId) => {
    try {
      const response = await axios.post(
        backend_url + "/api/order/updateOrder",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error("Order Not updated!");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <>
      <div className="p-2">
        <h1 className="text-4xl mb-5">
          <b>
            <i>Orders</i>
          </b>
        </h1>
        <div className="space-y-5 flex justify-center gap-2 flex-wrap">
          {loader ? (
            <Loader />
          ) : (
            AllOrders.map((order, index) => (
              <div
                key={index}
                className="border-2 border-gray-300 flex-wrap w-[270px] sm:w-[380px] md:w-full p-2 rounded-lg shadow-md flex flex-col gap-5 md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-3"
              >
                <div className="flex justify-center items-center">
                  <img
                    src={assets.parcel_icon}
                    alt=""
                    className="w-28 md:w-20"
                  />
                </div>

                <div className="text-center md:text-start">
                  <div>
                    {order.items.map((item, index) => (
                      <p key={index}>
                        {item.name} <span className="font-bold">x</span>{" "}
                        {item.quantity} <span>{item.size}</span>
                      </p>
                    ))}
                  </div>
                  <p className="py-2 font-semibold">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p>{order.address.street}</p>
                  <p>{order.address.city}</p>
                  <p>{order.address.phone}</p>
                </div>

                <div className="text-center md:text-start">
                  <p className="pb-3">Items: {order.items.length}</p>
                  <p>Method: {order.paymentMethod}</p>
                  <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>

                <div className="font-bold text-center md:text-start flex justify-center items-center">
                  <p>${order.amount}</p>
                </div>

                <div className="flex justify-center items-center">
                  <select
                    onChange={(event) => UpdateStatus(event, order._id)}
                    value={order.status}
                    className="outline-none border-2 cursor-pointer border-gray-400 rounded-md py-2 px-3 w-full"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="packing">Packing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
