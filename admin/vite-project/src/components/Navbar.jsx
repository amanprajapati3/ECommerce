import { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import { CgMenuRight } from "react-icons/cg";
import { GiCrossedBones } from "react-icons/gi";
import SideBar from "./SideBar";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
const Navbar = ({ setToken }) => {
  const [isMenu, setIsMenu] = useState(false);
  const location = useLocation();

  const toggleHandler = () => {
    setIsMenu(!isMenu);
  };
  useEffect(()=>{
    setIsMenu(false);
  }, [location.pathname])

  return (
    <>
      <div className="flex justify-between sm:mx-10 mx-2 my-2">
        <img src={assets.logo} alt="" className="sm:w-44 w-24" />
        <div className="sm:hidden">
          <button
            onClick={toggleHandler}
            className="mt-4 font-semibold text-3xl"
          >
            {" "}
            {isMenu ?<GiCrossedBones /> : <CgMenuRight /> }
          </button>
        </div>
        <button
          onClick={() => setToken("")}
          className="px-4 py-2 mt-3 active:bg-gray-900 h-fit rounded-md bg-gray-900 text-white hover:bg-black cursor-pointer"
        >
          <b>Logout</b>
        </button>
      </div>
      <div
        className={`fixed top-[60px] sm:hidden right-0 h-screen bg-white z-40 w-[70%] transform transition-transform duration-500 ease-in-out
          ${
            isMenu
              ? "translate-x-0 shadow-2xl shadow-black"
              : "translate-x-full "
          }`}
      >
        <div className=" mx-5  h-[80ch] border-gray-300">
          <NavLink
            to={"/add"}
            className={
              "flex gap-3 px-5 my-3 mx-1 items-center border border-gray-300 p-2 hover:bg-yellow-100 active:bg-yellow-200"
            }
          >
            <img src={assets.add_icon} alt="" />
            <p className="">Add Items</p>
          </NavLink>
          <NavLink
            to={"/order"}
            className={
              "flex gap-3 items-center pl-5 mx-1 border mb-3 border-gray-300 p-2 hover:bg-yellow-100 active:bg-yellow-200"
            }
          >
            <img src={assets.order_icon} alt="" />
            <p className="">Orders</p>
          </NavLink>
          <NavLink
            to={"/list"}
            className={
              "flex gap-3 items-center mx-1 pl-5 border border-gray-300 p-2 hover:bg-yellow-100 active:bg-yellow-200"
            }
          >
            <img src={assets.order_icon} alt="" />
            <p className="">List Items</p>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
