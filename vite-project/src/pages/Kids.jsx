import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItems from "../components/ProductItems";

const Kids = () => {
  const { products } = useContext(ShopContext);

  const kids = products.filter((items) => items.category === "Kids");

  return (
    <>
      <div className="sm:px-10  pt-5 py-5 bg-gradient-to-br via-gray-300 to-gray-500">
        <div className="flex justify-center my-3">
          <h1 className="text-center text-3xl font-mono font-semibold">
            Kids Clothes
          </h1>
        </div>
        <p className="text-center pb-5 sm:px-5 px-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit,
          iure. Lorem ipsum dolor sit amet.
        </p>

      <div className="flex justify-center text-center sm:mx-2 mb-10 flex-wrap sm:gap-6 gap-4">
          {kids.map((item, index) => (
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
      </div>
    </>
  );
};

export default Kids;
