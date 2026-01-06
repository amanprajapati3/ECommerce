import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProduct from "../components/RelatedProduct";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [size, setSize] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [sizeChart, setSizeChart] = useState(false);


  // Fetch product from context
  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) setProductData(product);
  }, [products, productId]);

  // Wishlist check
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item._id === productId);
    setIsWishlisted(!!exists);
  }, [productId]);

  if (!productData) return <p className="text-center mt-10">Loading...</p>;

  const discountPercent =
    productData.OriginalPrice && productData.OriginalPrice > productData.price
      ? Math.round(
          ((productData.OriginalPrice - productData.price) /
            productData.OriginalPrice) *
            100
        )
      : 0;

  const toggleWishlist = () => {
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
        image: productData.images[0],
        name: productData.name,
        price: productData.price,
      });
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setIsWishlisted(true);
      toast.success("Added to wishlist!");
    }
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const shortDesc =
    productData.description.length > 150
      ? productData.description.slice(0, 150) + "..."
      : productData.description;

  return (
    <div className=" md:mx-10 px-2 mb-10 mt-5 sm:mt-16">
      {/* Main section */}
      <div className="flex flex-col sm:flex-row gap-6 md:gap-10">
        {/* Desktop: Vertical Thumbnails */}
        <div className="hidden md:flex flex-col gap-2 mt-16">
          {productData.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumb-${idx}`}
              className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                selectedImageIndex === idx ? "border-black" : "border-gray-300"
              }`}
              onClick={() => handleThumbnailClick(idx)}
            />
          ))}
        </div>

        {/* Main Image + Mobile Thumbnails */}
        <div className="flex flex-col">
          {/* Main Image */}
          <img
            src={productData.images[selectedImageIndex]}
            alt="main"
            className="w-full border border-gray-400 sm:w-[400px] h-[300px] sm:h-[400px] md:w-full md:mr-16 lg:h-[500px] object-cover rounded"
          />

          {/* Mobile Thumbnails */}
          <div className="flex md:hidden justify-center gap-2 overflow-x-auto mt-3">
            {productData.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-mobile-${idx}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                  selectedImageIndex === idx
                    ? "border-black"
                    : "border-gray-300"
                }`}
                onClick={() => handleThumbnailClick(idx)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 mt-5 md:mt-0  ">
          <h1 className="font-bold pb-2 text-2xl">{productData.name}</h1>

          <div className="flex gap-1 my-2">
            {[...Array(4)].map((_, i) => (
              <img
                key={i}
                src={assets.star_icon}
                className="w-[20px]"
                alt="star"
              />
            ))}
            <img src={assets.star_dull_icon} className="w-[20px]" alt="star" />
            <span>(122)</span>
          </div>

          <div className="text-xl font-bold flex gap-2 my-2">
            <p>Rs.{productData.price}</p>
            {discountPercent > 0 && (
              <>
                <p className="line-through text-gray-600">
                  Rs.{productData.OriginalPrice}
                </p>
                <p className="text-red-700">{discountPercent}% OFF</p>
              </>
            )}
          </div>
           <div className="flex justify-between ">
            <div>
<h2 className="font-semibold mt-4">Select Size:</h2>
          <div className="flex gap-3 pb-10">
            {productData.sizes.map((s, i) => (
              <button
                key={i}
                onClick={() => setSize(s)}
                className={`px-3 py-2 rounded ${
                  size === s ? "bg-orange-400" : "bg-orange-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
            </div>
          <div>
            <button onClick={() => setSizeChart(true)} className="active:scale-95 font-semibold mt-10.5 bg-black py-2 px-5 text-white md:mr-20">
Size Chart
            </button>
             <div className={`absolute shadow-2xl shadow-gray-700 w-[290px] bg-white md:w-[400px] p-2 md:left-[35%] left-[6%] top-[120%] md:top-[50%] ${sizeChart ? 'flex': 'hidden'}`}>
              <div className="">
                 <div onClick={() => setSizeChart(false)} className=" right-5  absolute top-3">
                   <RxCross1/>
                 </div>
                  <img src={assets.size_chart} className="md:w-[700px] mt-5" alt="" />
                  </div>
             </div>
          </div>
          </div>

          <div className="flex w-full flex-row gap-2">
            <button
              onClick={() =>
                addToCart(productId, size, toast.success("Added to cart"))
              }
              className="bg-black w-full text-white py-2 hover:bg-gray-800"
            >
              Add to Cart
            </button>

            <button
              onClick={toggleWishlist}
              className="bg-pink-700 text-white py-2 w-full hover:bg-pink-500"
            >
              {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          <button className="mt-4 px-5 py-2 w-full hover:bg-green-600 active:scale-95 text-white bg-green-800 cursor-pointer">
            Buy Now
          </button>
          <div className="md:w-[450px]">
            <h1 className="mt-3 font-bold text-xl">Product Detail</h1>
            <p className=" ">
              {readMore ? productData.description : shortDesc}
            </p>
            {productData.description.length > 150 && (
              <button
                className="text-red-700  mb-3 font-bold hover:underline"
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? "Read Less" : "Read More"}
              </button>
            )}
          </div>
          <details>
            <summary className="cursor-pointer">
              <b>Return and policies</b>
            </summary>
            <ul className="py-5 list-style-type: square;">
              <li>
                <strong>*</strong> 100% Original product.
              </li>
              <li>
                <strong>*</strong> Cash on delivery on this product.
              </li>
              <li>
                <strong>*</strong> Easy return and exchange policy within 7
                days.
              </li>
            </ul>
          </details>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-2">Related Products</h2>
        <div className="flex flex-wrap gap-4">
          <RelatedProduct
            category={productData.category}
            subCategory={productData.subCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
