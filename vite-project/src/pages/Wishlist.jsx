import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast.success("Removed Successfully");
  };

  return (
    <>
      <div className="">
        <h2 className="sm:text-3xl text-2xl md:my-10 my-5 ml-5 font-semibold sm:ml-12">
          Your Wishlist
        </h2>

        {wishlist.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No items in wishlist.</p>
        ) : (
          <div className="sm:flex justify-center grid grid-cols-2 mb-10 flex-wrap sm:gap-1">
            {wishlist.map((item) => {
              const discountPercent =
                item.OriginalPrice && item.OriginalPrice > item.price
                  ? Math.round(((item.OriginalPrice - item.price) / item.OriginalPrice) * 100)
                  : 0;

              return (
                <div
                  key={item.id}
                  className="sm:w-[240px] w-full overflow-hidden border-gray-500 rounded bg-gray-100"
                >
                  <NavLink to={`/product/${item.id}`}>
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full sm:h-[240px] hover:scale-105 transition-all duration-300 object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-white bg-opacity-70 text-black px-2 py-1 text-xs rounded flex items-center gap-1">
                        <FaStar /> {rating}
                      </div>
                    </div>

                    <p className="text-center font-semibold text-[12px] sm:text-[16px] p-2">
                      {item.name}
                    </p>

                    <div className="flex sm:gap-2 gap-0.5 items-center px-2 pb-2">
                      <p className="font-bold text-black text-[14px] sm:text-[16px]">
                        Rs.{item.price}
                      </p>

                      {item.OriginalPrice && (
                        <p className="line-through text-gray-600 text-[10px] sm:text-[14px] mt-1">
                          (Rs.{item.OriginalPrice})
                        </p>
                      )}

                      {discountPercent > 0 && (
                        <p className="text-red-700 text-[10px] sm:text-sm font-semibold mt-1 ml-1">
                          {discountPercent}% OFF
                        </p>
                      )}
                    </div>
                  </NavLink>

                  <div className="text-center mb-2">
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-[12px] sm:text-[16px] px-3 py-1 rounded"
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
