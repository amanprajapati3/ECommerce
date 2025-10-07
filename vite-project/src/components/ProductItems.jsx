import {  useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { ShopContext } from "../context/ShopContext";

const ProductItems = ({ id, image, name, price, originalPrice }) => {

  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
  const discountPercent =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const [isWishlisted, setIsWishlisted] = useState(false);

  // Check if this product is already in wishlist on first render
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item.id === id);
    setIsWishlisted(!!exists);
  }, [id]);

  // Toggle wishlist
  const toggleWishlist = (e) => {
    e.preventDefault();

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item.id === id);

    if (exists) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter((item) => item.id !== id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsWishlisted(false);
      toast("Removed from wishlist", { icon: "❌" });
    } else {
      // Add to wishlist
      wishlist.push({ id, image, name, price });
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setIsWishlisted(true);
      toast.success("Added to wishlist!");
    }
  };

  return (
    <div className="sm:w-[240px] relative w-full overflow-hidden hover:shadow-2xl hover:shadow-gray-200 bg-gray-200">
      <button
        onClick={toggleWishlist}
        className="absolute top-2 right-2 bg-white rounded-full p-1 z-10 shadow-md transition-all duration-200 cursor-pointer active:scale-125"
        title="Toggle wishlist"
      >
        {isWishlisted ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-black" />
        )}
      </button>

      <NavLink to={`/product/${id}`}>
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full sm:h-[240px] hover:scale-105 transition-all duration-300 object-cover"
          />

          <div className="absolute bottom-2 left-2 bg-white bg-opacity-70 text-black px-2 py-1 text-xs rounded flex items-center gap-1">
            <FaStar /> {rating}
          </div>
        </div>

        <p className="py-1 px-2 text-center font-semibold text-[12px] sm:text-[16px]">
          {name}
        </p>
        <div className="flex sm:gap-2 gap-0.5">
          <p className="font-bold py-1 px-2">Rs.{price}</p>
          <p className="line-through sm:text-[14px] text-[10px] mt-3 mb-2 text-gray-600">
            (Rs.{originalPrice})
          </p>
          {discountPercent > 0 && (
            <p className="text-red-700 sm:text-sm text-[10px] font-semibold pt-2 px-2  ">
              {discountPercent}% OFF
            </p>
          )}
        </div>
      </NavLink>  

    </div>
  );
};

export default ProductItems;
