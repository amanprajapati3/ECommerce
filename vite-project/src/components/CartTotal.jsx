import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
  const { totalAmount } = useContext(ShopContext);

  return (
    <>
      <div className="flex justify-center my-10  p-5 ">
        <div className="md:w-[500px]">
          <div className="flex justify-center my-3">
            <h1 className="text-center text-2xl font-semibold">
              CART TOTAL
            </h1>
            <div className="w-[40px] mt-4 ml-2 bg-gray-700 h-[2px] font-bold"></div>
          </div>
          <div className="flex justify-between my-3">
             <p>
                SubTotal
             </p>
             <p>
                ${totalAmount()}.00
             </p>
          </div>
          <div className="flex justify-between my-3">
             <p>
                Shipping Fee
             </p>
             <p>
                $10.00
             </p>
          </div>
          <div className="flex justify-between">
             <p>
                 <b>Total</b>
             </p>
             <p>
               <b>${totalAmount() === 0? 0 : totalAmount() + 10 }.00</b> 
             </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartTotal;
