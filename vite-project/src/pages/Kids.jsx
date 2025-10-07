import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItems from "../components/ProductItems";
import Loader from "../components/Loader";

const Mens = () => {
  const { products, loader } = useContext(ShopContext);

  const Kids = products.filter((item) => item.category === "Kids");

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setMobileFilterOpen(false); // Close on mobile after selection
  };

  // Apply filter
  const filteredProducts =
    selectedFilter === "All"
      ? Kids
      : Kids.filter((item) => item.subCategory === selectedFilter);

  return (
    <>
      <div className="sm:px-10 pt-3 py-5 ">
        <div className="my-5 ml-4">
          <h1 className="text-3xl font-mono font-semibold">Kids</h1>
        </div>

        {/* Filter Section */}
        <div className=" flex ">
          {/* Desktop Sidebar Filters */}
          <div className="hidden sm:flex flex-col text-center w-48 px-12 border rounded-md p-4 bg-gray-100 h-fit">
            <h3 className="font-bold mb-2">Filters</h3>
            {["All", "Topwear", "Bottomwear", "Winterwear"].map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`text-center px-3 py-3 cursor-pointer     ${
                  selectedFilter === filter ? "font-bold " : ""
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Main Products Grid */}
          <div className="">
            {/* Mobile Filter Button */}
            <div className="sm:hidden mb-4 ml-4">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="px-4 py-2 bg-black text-white rounded-md"
              >
                {mobileFilterOpen ? "Close Filter" : "Filter"}
              </button>

              {mobileFilterOpen && (
                <div className="mt-2  p-4 rounded">
                  <h3 className="font-bold mb-2 sm:block hidden">Filters</h3>
                  {["All", "Topwear", "Bottomwear", "Winterwear"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => handleFilterChange(filter)}
                      className={`block w-full text-center px-2 py-1 rounded  ${
                        selectedFilter === filter ? "font-bold " : ""
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Products */}
            <div className="sm:ml-5 ">
            {loader ? (
              <Loader />
            ) : (
              <div className="sm:flex justify-center grid grid-cols-2 text-center mb-10 flex-wrap sm:gap-1  ">
                {filteredProducts.map((item, index) => (
                  <ProductItems
                    key={index}
                    id={item._id}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                     originalPrice={item.OriginalPrice}
                  />
                ))}
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mens;
