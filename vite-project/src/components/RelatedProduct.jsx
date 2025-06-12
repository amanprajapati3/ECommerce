import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItems from "./ProductItems";

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCpy = products.slice();
      productCpy = productCpy.filter((item) => category == item.category);
      productCpy = productCpy.filter((item) => subCategory == item.subCategory);
      setRelated(productCpy.slice(0, 4));
    }
  }, [products]);

  return (
    <>
    <div className="flex mt-5 justify-center text-center sm:mx-2 mb-10 flex-wrap sm:gap-6 gap-4">
          {related.map((item, index) => (
            <div className=" ">
              <ProductItems
                key={index}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            </div>
          ))}
        </div>
    </>
  );
};

export default RelatedProduct;
