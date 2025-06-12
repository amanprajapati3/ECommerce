import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItems from "./ProductItems";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products.slice(0, 12));
  }, [products]); 

  return (
    <div className="sm:mx-10 ">
      <div className="flex justify-center my-3">
        <h1 className="text-center text-2xl font-mono font-semibold">
          LATEST COLLECTION 
        </h1>
        </div>
      <p className="text-center pb-5 sm:px-5 px-2">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit,
        iure. Lorem ipsum dolor sit amet.
      </p>
      <div className="flex justify-center sm:mx-2 mb-10 flex-wrap sm:gap-6 gap-4">
        {latestProduct.map((item, index) => (
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
  );
};

export default LatestCollection;
