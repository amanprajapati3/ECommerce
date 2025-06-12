import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { IoPersonOutline } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom"; // Corrected import
import { FaCartArrowDown } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { RiMenu2Fill } from "react-icons/ri";
import { ShopContext } from "../context/ShopContext.jsx";

const Header = () => {
  const [search_bar, setSearch_bar] = useState(true);
  const [IsMenuOpen, SetIsMenuOpen] = useState(true);
  const navigate = useNavigate();

  const { search, setSearch, getCartCount, token, setToken, setCartItem } = useContext(ShopContext);

  const HandleSearchBar = () => {
    setSearch_bar(!search_bar);
  };

  const HandleMenuBar = () => {
    SetIsMenuOpen(!IsMenuOpen);
  };

const LogOutFunction = () =>{
  localStorage.removeItem('token');
  setToken('');
  setCartItem({});
  navigate("/login");
}

  return (
    <>
      <div className="flex sticky z-10 top-0 backdrop-blur-2xl justify-between px-5 lg:px-16 pt-2 sm:pt-5  sm:mt-0 sm:px-10">
        {/* logo */}
        <div>
          <NavLink to="/">
            <img src={assets.logo} alt="" className="md:w-48 w-40" />
          </NavLink>
        </div>

        {/* navbar for desktop */}
        <ul className="hidden md:flex gap-10 h-fit mt-2 ">
          <li className="hover:font-bold transition-all duration-300">
            <NavLink to="/">
              <p className="">HOME</p>
              <hr className="w-full transition-all duration-300 scale-x-0 h-[1.6px] ml-1 text-pink-700 hidden" />
            </NavLink>
          </li>
          <li className=" hover:font-bold transition-all duration-300">
            <NavLink to="/collection">
              {" "}
              <p>COLLECTION</p>
              <hr className="w-3/4 h-[2px] ml-1 text-pink-700 hidden" />
            </NavLink>
          </li>
          <li className=" hover:font-bold transition-all duration-300">
            <NavLink to="/about">
              {" "}
              <p>ABOUT</p>
              <hr className="w-3/4 h-[1.6px] ml-1 text-pink-700 hidden" />
            </NavLink>
          </li>
          <li className=" hover:font-bold transition-all duration-300">
            <NavLink to="/contact">
              {" "}
              <p>CONTACT</p>
              <hr className="w-3/4 h-[1.6px] ml-1 text-pink-700 hidden" />
            </NavLink>
          </li>
        </ul>

        {/* navbar for mobile */}
        <button
          className="text-2xl -mt-2 md:hidden cursor-pointer"
          onClick={HandleMenuBar}
        >
          {IsMenuOpen ? <RiMenu2Fill /> : <RxCross1 />}
        </button>

        {/* right side of header */}
        <div className="flex gap-2 sm:gap-5 mt-2 h-fit">
          <button
            onClick={HandleSearchBar}
            className="text-2xl h-fit hover:scale-125  duration-300 transition-all cursor-pointer"
          >
            {search_bar ? <IoSearchSharp /> : <RxCross1 />}
          </button>
          <div className="group relative hidden md:block">
            <button className="text-2xl cursor-pointer hover:font-bold">
              <NavLink to={"/login"}>
                <IoPersonOutline />
              </NavLink>

              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className={token ? (`flex flex-col gap-2 w-36 py-2 px-5 bg-slate-50 text-gray-800`): 'hidden'}>
                  <p className="cursor-pointer text-[18px] hover:text-black">
                    <NavLink to="/profile">My profile</NavLink>
                  </p>
                  <p className="cursor-pointer text-[18px] hover:text-black">
                    <NavLink to="/order">Order</NavLink>
                  </p>
                  <p onClick={LogOutFunction} className="cursor-pointer text-[18px] hover:text-black">
                    Logout
                  </p>
                </div>
              </div>
            </button>
          </div>
          <div>
            <NavLink to="/cart">
              <button className="text-3xl hover:scale-125 duration-300 transition-all cursor-pointer">
                <FaCartArrowDown />
              </button>
              <p className="relative w-fit ml-5 -mt-5 bg-black text-white p-1 text-[10px] rounded-2xl">
                {getCartCount()}
              </p>
            </NavLink>
          </div>
        </div>
      </div>

      <ul
         className={`fixed top-[55px] md:hidden right-0 h-screen bg-gray-200 z-40 w-[70%] transform transition-transform duration-500 pt-3 text-center ease-in-out
          ${
            IsMenuOpen
              ? "translate-x-full " : "translate-x-0 shadow-2xl shadow-black"
              
          }`}
      >
        <li className="border-b-2 border-b-gray-400 hover:border-b-gray-900 hover:font-bold transition-all duration-300 py-3 ">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="border-b-2 border-b-gray-400 hover:border-b-gray-900 hover:font-bold transition-all duration-300 py-3 ">
          <NavLink to="/collection">Collection</NavLink>
        </li>  
        <li className="border-b-2 border-b-gray-400 hover:border-b-gray-900 hover:font-bold transition-all duration-300 py-3 ">
          <NavLink to="/about">About</NavLink>
        </li>
        <li className="border-b-2 border-b-gray-400 hover:border-b-gray-900 hover:font-bold transition-all duration-300 py-3 ">
          <NavLink to="/contact">Contact</NavLink>
        </li>
         <li className="border-b-2 border-b-gray-400 hover:border-b-gray-900 hover:font-bold transition-all duration-300 py-3 ">
          <NavLink to="/profile">My profile</NavLink>
        </li>
        <li className="border-b-2 border-b-gray-400 hover:border-b-gray-900 hover:font-bold transition-all duration-300 py-3 ">
         <NavLink to="/order">Order</NavLink>
        </li>
      </ul>

      <div
        className={
          search_bar
            ? `w-0 h-0 scale-x-0`
            : `flex scale-x-100 justify-center duration-600 transition-all `
        }
      >
        <input
          type="search"
          placeholder="Search Product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border-2 border-gray-400 focus:border-gray-500 focus:bg-gray-200 outline-none rounded-xl text-xl "
        />
      </div>
    </>
  );
};

export default Header;
