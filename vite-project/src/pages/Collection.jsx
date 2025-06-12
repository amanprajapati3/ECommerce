import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItems from "../components/ProductItems";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Collection = () => {
  const { products, search } = useContext(ShopContext);

  const [filterProduct, setFilterProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const ToggleCategory = (e) => {
    const value = e.target.value;
    setSelectedCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const ToggleSubCategory = (e) => {
    const value = e.target.value;
    setSelectedSubcategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productCpy = [...products];

    if (search) {
      productCpy = productCpy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory.length > 0) {
      productCpy = productCpy.filter((item) =>
        selectedCategory.includes(item.category)
      );
    }

    if (selectedSubcategories.length > 0) {
      productCpy = productCpy.filter((item) =>
        selectedSubcategories.includes(item.subCategory)
      );
    }

    setFilterProduct(productCpy);
  };

  useEffect(() => {
    setFilterProduct(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [selectedCategory, selectedSubcategories, search]);

  const sortProduct = () => {
    let fp = filterProduct.slice();

    switch (sortType) {
      case "Low_to_High":
        setFilterProduct(fp.sort((a, b) => a.price - b.price));
        break;
      case "High_to_Low":
        setFilterProduct(fp.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <>
      <div className="flex lg:gap-5 sm:mx-10 mx-2 mt-5">
        <div className="lg:w-1/6 sm:w-1/4 hidden sm:block">
          <h1 className="font-medium pb-7">FILTERS</h1>

          <div className="p-5 border-2 rounded-md border-gray-400">
            <h1 className="font-bold">CATEGORIES</h1>
            <ul>
              <li className="py-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="category"
                  value="Men"
                  checked={selectedCategory.includes("Men")}
                  onChange={ToggleCategory}
                />{" "}
                Men
              </li>
              <li className="py-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="category"
                  value="Women"
                  checked={selectedCategory.includes("Women")}
                  onChange={ToggleCategory}
                />{" "}
                Women
              </li>
              <li className="py-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="category"
                  value="Kids"
                  checked={selectedCategory.includes("Kids")}
                  onChange={ToggleCategory}
                />{" "}
                Kids
              </li>
            </ul>
          </div>

          <div className="p-2 border-2 rounded-md mt-5 border-gray-400">
            <h1 className="font-bold">TYPE</h1>
            <ul>
              {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
                <li key={sub} className="py-2">
                  <input
                    type="checkbox"
                    value={sub}
                    checked={selectedSubcategories.includes(sub)}
                    onChange={ToggleSubCategory}
                  />{" "}
                  {sub}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:5/6 sm:w-3/4 w-full ">
          <div className="flex gap-10  outline-none justify-between">
            <div className="flex mb-2">
              <h1 className="text-left sm:text-2xl  ">ALL COLLECTION</h1>
              <div className="md:w-[70px] sm:w-[30px] w-0 mt-3 ml-2 bg-gray-800 h-[2px] font-bold"></div>
            </div>
            <div className="">
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="md:px-3 py-1 rounded-md bg-amber-600 text-white sm:w-full w-[80px]"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="High_to_Low">Sort by: High to Low</option>
                <option value="Low_to_High">Sort by: Low to High</option>
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          <div className="sm:hidden mb-5 ">
            <div className="flex w-fit bg-teal-700 hover:bg-teal-500 active:bg-teal-700 active:scale-95 text-white px-4 py-2 rounded-md text-left font-medium gap-2">
              <p>Filter</p>
              <button
                onClick={() => setShowMobileFilters((prev) => !prev)}
                className=""
              >
                {showMobileFilters ?<IoIosArrowUp /> : <IoIosArrowDown />  }
              </button>
            </div>

            {showMobileFilters && (
              <div className="mt-3 border border-gray-500  p-3 rounded-md bg-white shadow">
                <h2 className="font-bold mb-2">CATEGORIES</h2>
                {["Men", "Women", "Kids"].map((cat) => (
                  <div key={cat} className="py-1">
                    <label>
                      <input
                        type="checkbox"
                        value={cat}
                        checked={selectedCategory.includes(cat)}
                        onChange={ToggleCategory}
                      />{" "}
                      {cat}
                    </label>
                  </div>
                ))}

                <h2 className="font-bold mt-4 mb-2">TYPE</h2>
                {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
                  <div key={sub} className="py-1">
                    <label>
                      <input
                        type="checkbox"
                        value={sub}
                        checked={selectedSubcategories.includes(sub)}
                        onChange={ToggleSubCategory}
                      />{" "}
                      {sub}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center text-center mb-10 flex-wrap sm:gap-6 gap-2">
            {filterProduct.map((item, index) => (
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
      </div>
    </>
  );
};

export default Collection;
