import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItems from "./ProductItems";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [BestSellerProduct, setBestSellerProduct] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);

    setBestSellerProduct(bestProduct.slice(0,4));
  }, [products]);

  return (
    <>
      <div className="sm:mx-10 mx-5">
        <div className="flex justify-center">
        <h1 className="text-center text-2xl font-semibold">
          BESTSELLER 
        </h1>
        <div className="w-[80px] mt-4 ml-2 bg-gray-700 h-[2px] font-bold"></div>
        </div>
      
        <p className="text-center pb-5 pt-4 px-5">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit,
          iure. Lorem ipsum dolor sit amet.
        </p>
        <div className="flex justify-center mx-2 mb-10 flex-wrap gap-6">
          {BestSellerProduct.map((item, index) => (
            <ProductItems
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BestSeller;
