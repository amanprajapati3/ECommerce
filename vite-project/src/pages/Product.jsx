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

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        console.log(item);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [products]);

  return productData ? (
    <div>
      <div className="flex justify-center gap-10 flex-wrap md:mx-20 mx-8 my-10">
        <div className="flex justify-center">
          <img
            src={productData.image}
            alt=""
            className="sm:w-[400px] h-[300px] sm:h-[400] lg:h-[500px]"
          />
        </div>
        <div className="text-center">
          <h1 className="font-bold pb-2">{productData.name}</h1>
          <div className="flex gap-2 my-2">
            <img src={assets.star_icon} alt="" className="w-[18px]" />
            <img src={assets.star_icon} alt="" className="w-[18px]" />
            <img src={assets.star_icon} alt="" className="w-[18px]" />
            <img src={assets.star_icon} alt="" className="w-[18px]" />
            <img src={assets.star_dull_icon} alt="" className="w-[18px]" />
            <span>(122)</span>
          </div>
          <div className="text-left my-5">
            <label htmlFor="" className="font-bold text-xl py-2">
              ${productData.price}
            </label>
            <p className="py-3 md:w-[450px]">{productData.description}</p>
            <h1 className="pt-5 pb-2">Select Size :</h1>
            <div className="flex gap-3 pb-6">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setsize(item)}
                  key={index}
                  className={`px-3 py-2 cursor-pointer ${
                    item === size ? "border-2 border-gray-600" : ""
                  }`}
                >
                  {item}
                </button> 
              ))}
            </div>
            <button onClick={()=> addToCart(productData._id, size, toast.success("Product added Successfully"))} className="px-5 py-2 text-white bg-black rounded-md active:scale-105 active:bg-gray-900 active:text-white cursor-pointer">
              ADD TO CART
            </button>
            <p className="py-5">
              100% Original product. <br /> Cash on delivery on this product.{" "}
              <br />
              Easy return and exchange policy within 7 days.
            </p>
          </div>
        </div>
      </div>
      <div className="md:mx-20 flex justify-center mx-8 my-10">
        <div>
          <div className="flex justify-center">
            <button className="px-6 py-2 font-bold border-2 border-gray-300">
              Description
            </button>
            <button className="px-6 py-2 font-bold border-2 border-gray-300">
              Review(122)
            </button>
          </div>
          <div className="flex justify-center  md:mx-20 mx-8">
            <p className="py-10 text-center">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto,
              aut labore? Quas asperiores tenetur perspiciatis debitis
              distinctio, ab deleniti et, error soluta ipsam praesentium enim
              magni libero atque quibusdam ipsum explicabo{" "}
              <span className="hidden sm:block">
                laboriosam officiis magnam expedita repudiandae, iusto ad
                blanditiis maiores! Maxime enim debitis voluptatum et numquam
                illum odit, alias cum?
              </span>{" "}
              <br />
              <br />
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi,
              magnam temporibus.{" "}
              <span className="hidden sm:block">
                Itaque quo facere beatae deleniti! Illum voluptatum ullam
                iste!deleniti et, error soluta ipsam praesentium enim magni
                libero atque quibusdam ipsum explicabo laboriosam officiis
                magnam expedita repudiandae, iusto ad blanditiis maiores!
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* related production section */}
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
