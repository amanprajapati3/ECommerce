import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { IoPersonOutline } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom"; // Corrected import
import { FaCartArrowDown } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { RiMenu2Fill } from "react-icons/ri";
import { ShopContext } from "../context/ShopContext.jsx";
import { CgProfile } from "react-icons/cg";
import { BsCart4, BsCollection } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./animation.css";

const Header = () => {
  const [search_bar, setSearch_bar] = useState(true);
  const [IsMenuOpen, SetIsMenuOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const { search, setSearch, getCartCount, token, setToken, setCartItem } =
    useContext(ShopContext);

  const HandleSearchBar = () => {
    setSearch_bar(!search_bar);
  };

  const HandleMenuBar = () => {
    SetIsMenuOpen(!IsMenuOpen);
  };

  const LogOutFunction = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItem({});
    navigate("/login");
  };
  useEffect(()=>{
    SetIsMenuOpen(true)
  }, [location.pathname])

  return (
    <>
    <div className="bg-red-700 overflow-hidden text-white text-xl md:text-2xl py-3" >
      <h1 className="text-center" id="marquee">GET 15% OFF on your First Order</h1>

    </div>
      <div className="flex sticky z-20 top-0 backdrop-blur-2xl justify-between px-5 lg:px-16 pt-2 sm:pt-5 text-[12px] sm:mt-0 sm:px-10">
        {/* logo */}
        <div className="">
          <NavLink to="/">
            <img src={assets.logo} alt="" className="md:w-36 w-32" />
          </NavLink>
        </div>

        {/* navbar for desktop */}
        <ul className="hidden lg:flex gap-10 h-fit  ">
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
            <NavLink to="/mens">
              {" "}
              <p>MEN</p>
              <hr className="w-3/4 h-[1.6px] ml-1 text-pink-700 hidden" />
            </NavLink>
          </li>
          <li className=" hover:font-bold transition-all duration-300">
            <NavLink to="/women">
              {" "}
              <p>WOMAN</p>
              <hr className="w-3/4 h-[1.6px] ml-1 text-pink-700 hidden" />
            </NavLink>
          </li>
          <li className=" hover:font-bold transition-all duration-300">
            <NavLink to="/kids">
              {" "}
              <p>KIDS</p>
              <hr className="w-3/4 h-[1.6px] ml-1 text-pink-700 hidden" />
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
          className="text-2xl -mt-2 lg:hidden cursor-pointer"
          onClick={HandleMenuBar}
        >
          {IsMenuOpen ? <RiMenu2Fill /> : <RxCross1 />}
        </button>

        {/* right side of header */}
        <div className="flex gap-2 sm:gap-5 mt-1 sm:mt-0 h-fit">
          <button
            onClick={HandleSearchBar}
            className="text-xl h-fit hover:scale-125  duration-300 transition-all cursor-pointer"
          >
            {search_bar ? <IoSearchSharp /> : <RxCross1 />}
          </button>
          <div className="group relative hidden md:block">
            <button className="text-xl cursor-pointer hover:font-bold">
              <NavLink to={"/login"}>
                <IoPersonOutline />
              </NavLink>

              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div
                  className={
                    token
                      ? `flex flex-col gap-2 w-36 py-2 px-5 bg-slate-50 text-gray-800`
                      : "hidden"
                  }
                >
                  <p className="cursor-pointer text-sm hover:text-black">
                    <NavLink to="/profile">My profile</NavLink>
                  </p>
                  <p className="cursor-pointer text-sm hover:text-black">
                    <NavLink to="/order">My Orders</NavLink>
                  </p>
                  <p
                    onClick={LogOutFunction}
                    className="cursor-pointer text-sm hover:text-black"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </button>
          </div>
          <div>
            <NavLink to="/wishlist">
              <button className="text-[17px] sm:mt-1 mt-0.5 mr-1 cursor-pointer hover:scale-125 transition-all duration-200">
                <FaRegHeart />
              </button>
            </NavLink>
          </div>
          <div>
            <NavLink to="/cart">
              <button className="text-2xl hover:scale-125 duration-300 transition-all cursor-pointer">
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
        className={`fixed top-[43px] lg:hidden right-0 h-screen bg-gray-200 text-gray-900 z-40 w-[70%] transform transition-transform duration-500 pt-2 text-center ease-in-out
          ${
            IsMenuOpen
              ? "translate-x-full "
              : "translate-x-0 shadow-2xl shadow-black"
          }`}
      >
        <li className=" transition-all duration-300 py-2 ">
          <NavLink to="/">
            <p>Home</p>
          </NavLink>
        </li>

        <li className=" hover:font-bold transition-all py-2 duration-300">
          <NavLink to="/mens">
            {" "}
            <p>Men</p>
            <hr className="w-3/4 h-[1.6px] ml-1 text-pink-700 hidden" />
          </NavLink>
        </li>
        <li className=" hover:font-bold transition-all py-2 duration-300">
          <NavLink to="/women">
            {" "}
            <p>Woman</p>
            <hr className="w-3/4 h-[1.6px] ml-1 text-pink-700 hidden" />
          </NavLink>
        </li>
        <li className=" hover:font-bold transition-all py-2 duration-300">
          <NavLink to="/kids">
            {" "}
            <p>Kids</p>
            <hr className="w-3/4 h-[1.6px] ml-1 text-pink-700 hidden" />
          </NavLink>
        </li>

        <li className=" transition-all duration-300 py-2 ">
          <NavLink to="/about">
            <p>About</p>
          </NavLink>
        </li>
        <li className=" transition-all duration-300 py-2 ">
          <NavLink to="/contact">
            <p>Contact</p>
          </NavLink>
        </li>
        <li className=" transition-all duration-300 py-2 ">
          <p className="cursor-pointer  hover:text-black">
            <NavLink to="/profile">My profile</NavLink>
          </p>
        </li>
        <li className=" transition-all duration-300 py-2 ">
          <p className="cursor-pointer  hover:text-black">
            <NavLink to="/order">My Orders</NavLink>
          </p>
        </li>
        <li className=" transition-all duration-300  ">
          {token ? (
            <p
              onClick={LogOutFunction}
              className="transition-all duration-300 py-2"
            >
              Logout
            </p>
          ) : (
            <NavLink to="/login">
              <p className="">Login</p>
            </NavLink>
          )}
        </li>
      </ul>

      <div
        className={
          search_bar
            ? `w-0 h-0 scale-x-0`
            : `flex scale-x-100 sticky
            top-10 justify-center duration-600 w-full transition-all`
        }
      >
        <input
          type="search"
          placeholder="Search Product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-2 py-3 border-b-2 bg-gray-400 rounded-md w-full sm:w-[500px] border-gray-400 focus:border-gray-500 focus:bg-gray-300 outline-none   "
        />
      </div>

      {/* sticky navbar for mobile */}

      <div className="fixed sm:hidden bg-transparent backdrop-blur-2xl z-10 bottom-0 w-full">
        <ul className="flex justify-between mx-9">
          <li className=" transition-all duration-300 py-3">
            <NavLink to="/">
              <p className="text-xl">
                <AiOutlineHome />
              </p>
            </NavLink>
          </li>
          <li className=" transition-all duration-300 py-3 ">
            <NavLink to="/collection">
              <p className="text-xl text-center items-center">
                <BsCollection />
              </p>
            </NavLink>
          </li>
          <li className=" transition-all duration-300 py-3 ">
            <NavLink to="/order">
              <p className="text-xl">
                <BsCart4 />
              </p>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
