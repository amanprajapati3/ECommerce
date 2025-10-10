import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProduct from "../components/RelatedProduct";
import toast from "react-hot-toast";

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(false);
  const [size, setsize] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const fetchProductData = async () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        console.log(item);
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [products]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item._id === productId);
    setIsWishlisted(!!exists);
  }, [productId]);

  const toggleWishlist = (e) => {
    e.preventDefault();

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item._id === productId);

    if (exists) {
      const updatedWishlist = wishlist.filter((item) => item._id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsWishlisted(false);
      toast("Removed from wishlist", { icon: "❌" });
    } else {
      wishlist.push({
        _id: productId,
        image: productData.image,
        name: productData.name,
        price: productData.price,
      });
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setIsWishlisted(true);
      toast.success("Added to wishlist!");
    }
  };

    const discountPercent =
    productData?.OriginalPrice && productData?.OriginalPrice > productData?.price
      ? Math.round(((productData.OriginalPrice - productData.price) / productData.OriginalPrice) * 100)
      : 0;


  return productData ? (
    <div>
      <div className="flex justify-center sm:gap-10 gap-3 flex-wrap md:mx-20 mx-2 my-10">
        <div className="flex justify-center">
          <img
            src={productData.image}
            alt=""
            className="sm:w-[400px]  h-[300px] sm:h-[400px] lg:h-[500px]"
          />
        </div>
        <div>
          <h1 className="font-bold pb-2 text-2xl">{productData.name}</h1>
          <div className="flex gap-1 my-2">
            <img src={assets.star_icon} alt="" className="w-[20px]" />
            <img src={assets.star_icon} alt="" className="w-[20px]" />
            <img src={assets.star_icon} alt="" className="w-[20px]" />
            <img src={assets.star_icon} alt="" className="w-[20px]" />
            <img src={assets.star_dull_icon} alt="" className="w-[20px]" />
            <span>(122)</span>
          </div>
          <div className="text-left my-5">
            <div className="flex sm:gap-2 gap-0.5 text-xl">
          <p className="font-bold py-1 px-2">Rs.{productData.price}</p>
          <p className="line-through sm:text-[14px] text-[14px] mt-3 mb-2 text-gray-600">
            (Rs.{productData.OriginalPrice})
          </p>
          {discountPercent > 0 && (
            <p className="text-red-700 sm:text-sm text-[12px] font-semibold pt-2 px-2  ">
              {discountPercent}% OFF
            </p>
          )}
        </div>
        <div className="bg-orange-300 pl-2 rounded-md w-full py-2 font-semibold sm:text-xl text-orange-800">
            You saved Rs.{productData.OriginalPrice-productData.price}
          </div>
            <h1 className="pt-5 pb-2">Select Size:</h1>
            <div className="flex gap-3 pb-6">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setsize(item)}
                  key={index}
                  className={`px-3 py-2 cursor-pointer ${
                    item === size ? "bg-orange-400" : "bg-orange-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex gap-2 w-full">
              <button
                onClick={() =>
                  addToCart(
                    productData._id,
                    size,
                    toast.success("Product added Successfully")
                  )
                }
                className="px-5 mt-[7px] sm:mt-0 hover:bg-gray-800 active:scale-95 text-[13px] sm:text-md text-white w-full bg-black  active:bg-gray-900 active:text-white cursor-pointer"
              >
                ADD TO CART
              </button>

              <button
                onClick={toggleWishlist}
                className="mt-2 sm:mt-0 hover:bg-pink-500 cursor-pointer active:scale-95 px-5 py-2 w-full bg-pink-700 text-white  "
              >
                {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            <button className="mt-4 px-5 py-2 w-full hover:bg-green-600 active:scale-95 text-white bg-green-800  active:bg-gray-900 active:text-white cursor-pointer">
              Buy Now
            </button>
             <h1 className="mt-3 font-bold text-xl">Product Detail</h1>
            <p className="py-3 md:w-[450px]">{productData.description}</p>
            <p className="py-5">
              100% Original product. <br />
              Cash on delivery on this product. <br />
              Easy return and exchange policy within 7 days.
            </p>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="">
        <div className="flex justify-center my-10 mb-2 ml-2">
          <h1 className="text-left text-xl">RELATED PRODUCTS</h1>
          <div className="w-[70px] mt-3 ml-2 bg-gray-800 h-[2px] font-bold"></div>
        </div>
        <div className="sm:mx-16 flex justify-center flex-wrap md:gap-5 gap-2">
          <RelatedProduct
            category={productData.category}
            subCategory={productData.subCategory}
          />
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Product;
