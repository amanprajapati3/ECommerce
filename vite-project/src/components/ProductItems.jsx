import React from "react";
import { NavLink } from "react-router-dom";  // Corrected import

const ProductItems = ({id, image, name, price}) => {
  return (
    <>
      <div className="sm:w-[240px] border-2 border-gray-300  w-[145px] overflow-hidden hover:shadow-2xl hover:shadow-gray-200  bg-gray-200">
        <NavLink to={`/product/${id}`}>
          <img src={image} alt="" className="w-full sm:h-[240px] hover:scale-105 transition-all duration-300" />
          <p className="py-1">{name}</p>
          <p className="font-bold py-1">${price}</p>
        </NavLink>
      </div>
    </>
  );
};

export default ProductItems;
