import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { RiDeleteBin2Line } from "react-icons/ri";
import CartTotal from "../components/CartTotal";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const { products, cartItem, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className=" md:mx-20 mx-10  mt-5">
      <div>
        <div className="flex justify-center mb-2 ml-2">
          <h1 className="text-left text-xl mb-5">MY CART</h1>
          <div className="w-[70px] mt-3 ml-2 bg-gray-800 h-[2px] font-bold"></div>
        </div>

        {cartData.length === 0 ? (
          <div className="flex justify-center flex-wrap">
            <img
              src="https://assets-v2.lottiefiles.com/a/0953d504-117d-11ee-aa49-1f149204cb5f/9uZcoEJaoF.gif"
              alt=""
              className="sm:w-[350px] mix-blend-multiply"
            />
          </div>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            if (!productData) return null;

            return (
              <div className=" ">
                <div
                  key={index}
                  className="border-2 border-gray-300 my-4 p-2 w-full sm:flex  px-6 md:px-12"
                >
                  <div className="flex justify-center">
                    <img
                      src={productData.image[0]}
                      alt={productData.name}
                      className="sm:w-[180px] w-fit h-[180px] "
                    />
                  </div>

                  <div className="sm:ml-10 mt-2 w-[100%]">
                    <p className="font-semibold text-center sm:text-xl">
                      {productData.name}
                    </p>
                    <div className="flex justify-between my-2">
                      <div className="flex md:gap-10  w-fit gap-3 ">
                        <p className="text-2xl">${productData.price}</p>
                        <p className="py-1 font-medium">Size: {item.size}</p>
                      </div>
                      <div>
                        <p>
                          {" "}
                          <input
                            onChange={(e) =>
                              e.target.value === "" || e.target.value === "0"
                                ? null
                                : updateQuantity(
                                    item._id,
                                    item.size,
                                    Number(e.target.value)
                                  )
                            }
                            type="number"
                            className="w-[50px] mt-1  sm:h-10 pl-3  outline-none sm:mt-0 focus:border-2 focus:border-gray-500 border-gray-400 rounded-md"
                            defaultValue={item.quantity}
                            min={1}
                          />
                        </p>
                      </div>
                      <div className="mt-1">
                        <button
                          onClick={() => updateQuantity(item._id, item.size, 0)}
                          className="cursor-pointer text-2xl hover:text-red-600"
                        >
                          <RiDeleteBin2Line />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="flex justify-center text-center">
        <div>
          <CartTotal />
          <NavLink to={"/placeOrder"}>
            {" "}
            <button className="bg-black rounded-md hover:bg-gray-900 mb-5 text-white cursor-pointer py-4 px-10 font-medium">
              Proceed to CheckOut
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Cart;
