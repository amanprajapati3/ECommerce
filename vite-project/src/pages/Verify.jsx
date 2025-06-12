import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Verify = () => {
  const { token, setCartItem, backend_url } = useContext(ShopContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backend_url + "/api/order/verifyStripe",
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItem({});
        navigate("/order");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <>
      <div>verify</div>
    </>
  );
};

export default Verify;
