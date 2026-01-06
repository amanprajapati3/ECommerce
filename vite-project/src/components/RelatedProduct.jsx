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
      setRelated(productCpy.slice(0, 8));
    }
  }, [products]);

  return (
    <>
    <div className="sm:flex justify-center grid mt-10 grid-cols-2 text-center mb-10 flex-wrap sm:gap-1 ">
          {related.map((item, index) => (
            <div className=" ">
              <ProductItems
                key={index}
                id={item._id}
                name={item.name}
                image1={item.images[0]}
            image2={item.images[1]}
                price={item.price}
                originalPrice={item.OriginalPrice}
              />
            </div>
          ))}
        </div>
    </>
  );
};

export default RelatedProduct;
