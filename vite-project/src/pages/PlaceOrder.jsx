import React, { useContext, useState } from "react";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PlaceOrder = () => {
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { backend_url, token, products, cartItem, setCartItem, totalAmount } =
    useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    setLoading(true);
    event.preventDefault();
    console.log(formData);

    try {
      const orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      console.log(orderItems);

      let orderData = {
        address: formData,
        items: orderItems,
        amount: totalAmount() + 10,
      };

      switch (method) {
        //  api call for cod
        case "COD":
          try {
            const response = await axios.post(
              backend_url + "/api/order/cash",
              orderData,
              { headers: { token } }
            );
            if (response.data.success) {
              setCartItem({});
              navigate("/order");
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            toast.error(error.message);
          }

          break;

        //  api call for razorpay
        case "razorpay":
          try {
            const response = await axios.post(
              backend_url + "/api/order/razorpay",
              orderData,
              { headers: { token } }
            );
            if (response.data.success) {
              setCartItem({});
              navigate("/order");
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            toast.error(error.message);
          }

          break;

        //  api call for stripe
        case "stripe":
          try {
            const responseStripe = await axios.post(
              backend_url + "/api/order/stripe",
              orderData,
              { headers: { token } }
            );
            if (responseStripe.data.success) {
              const { session_url } = responseStripe.data;
              window.location.replace(session_url);
            } else {
              toast.error(responseStripe.data.message);
            }
          } catch (error) {
            toast.error(error.message);
          }

          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="md:mx-10  mt-5 mb-20">
        <div>
          <div className="flex justify-center text-center sm:mb-5">
            <h1 className="text-center text-xl mb-5">DELIVERY INFORMATION</h1>
          </div>
          <div className=" md:mx-28">
            <form
              action=""
              className="lg:flex gap-5 form-container w-full "
              onSubmit={onSubmitHandler}
            >
              <div className=" w-full p-5">
                <div className="flex  gap-3">
                  <input
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={onChangeHandler}
                    required
                    className="py-2 pl-1 my-3 w-full  border-2 border-b-blue-500 bg-white rounded-xl border-transparent focus:bg-blue-100 outline-none "
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    onChange={onChangeHandler}
                    value={formData.lastName}
                    required
                    className="py-2 pl-1 my-3 w-full  border-2 border-b-blue-500 bg-white rounded-xl border-transparent focus:bg-blue-100 outline-none "
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  onChange={onChangeHandler}
                  name="email"
                  value={formData.email}
                  required
                  className="py-2 pl-1 my-3 w-full  border-2 border-b-blue-500 bg-white rounded-xl border-transparent focus:bg-blue-100 outline-none "
                />
                <div className="flex  gap-3">
                  <input
                    type="text"
                    placeholder="Street"
                    onChange={onChangeHandler}
                    name="street"
                    value={formData.street}
                    required
                    className="py-2 pl-1 my-3 w-full  border-2 border-b-blue-500 bg-white rounded-xl border-transparent focus:bg-blue-100 outline-none "
                  />
                  <input
                    type="text"
                    placeholder="City"
                    onChange={onChangeHandler}
                    name="city"
                    value={formData.city}
                    required
                    className="py-2 pl-1 my-3 w-full  border-2 border-b-blue-500 bg-white rounded-xl border-transparent focus:bg-blue-100 outline-none "
                  />
                </div>
                <input
                  type="text"
                  placeholder="State"
                  onChange={onChangeHandler}
                  name="state"
                  value={formData.state}
                  required
                  className="py-2 pl-1 my-3 w-full  border-2 border-b-blue-500 bg-white rounded-xl border-transparent focus:bg-blue-100 outline-none "
                />
                <div className="flex  gap-3">
                  <input
                    type="text"
                    placeholder="Country"
                    onChange={onChangeHandler}
                    name="country"
                    value={formData.country}
                    required
                    className="py-2 pl-1 my-3 w-full  border-2 border-b-blue-500 bg-white rounded-xl border-transparent focus:bg-blue-100 outline-none "
                  />
                  <input
                    type="number"
                    placeholder="Phone Number"
                    onChange={onChangeHandler}
                    name="phone"
                    pattern="{10,}"
                    value={formData.phone}
                    required
                    className="py-2 pl-1 my-3 w-full  border-2 border-b-blue-500 bg-white rounded-xl border-transparent focus:bg-blue-100 outline-none "
                  />
                </div>
              </div>
              <div className=" flex lg:w-[40%] w-full ">
                <div className="w-full ">
                  <CartTotal />
                  <div className="my-3 px-2 justify-center flex gap-2 flex-row">
                    <div
                      className={
                        method === "razorpay"
                          ? "bg-green-300 cursor-pointer"
                          : "cursor-pointer"
                      }
                      onClick={() => setMethod("razorpay")}
                    >
                      <img
                        src={assets.razorpay_logo}
                        alt=""
                        className="w-32 pt-2"
                      />
                    </div>
                    <div
                      className={
                        method === "stripe"
                          ? "bg-green-300 cursor-pointer"
                          : " cursor-pointe3"
                      }
                      onClick={() => setMethod("stripe")}
                    >
                      <img
                        src={assets.stripe_logo}
                        alt=""
                        className="w-32 h-10  p-2"
                      />
                    </div>
                    <div
                      className={
                        method === "COD"
                          ? "bg-green-300 py-2 px-1 cursor-pointer"
                          : "py-2 px-1 cursor-pointer"
                      }
                      onClick={() => setMethod("COD")}
                    >
                      CashOnDelivery
                    </div>
                  </div>
                  <center>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-black mt-5 text-white hover:bg-gray-800 active:bg-black active:scale-95 px-10 py-2 cursor-pointer"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        "Place Order"
                      )}
                    </button>
                  </center>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
