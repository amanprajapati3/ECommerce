import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

const SideBar = () => {
  return (
    <>
      <div className="sm:pt-5 sm:w-[300px] w-[60%] lg:pl-10 hidden sm:block border-r-2 h-[80ch] border-gray-300">
        <NavLink to={"/add"} className={"flex gap-3 px-5 my-3 mx-1 items-center border border-gray-300 p-2 hover:bg-yellow-100 active:bg-yellow-200"}>
          <img src={assets.add_icon} alt="" />
          <p className="">Add Items</p>
        </NavLink>
        <NavLink to={"/order"} className={"flex gap-3 items-center pl-5 mx-1 border mb-3 border-gray-300 p-2 hover:bg-yellow-100 active:bg-yellow-200"}>
          <img src={assets.order_icon} alt="" />
          <p className="">Orders</p>
        </NavLink>
        <NavLink to={"/list"} className={"flex gap-3 items-center mx-1 pl-5 border border-gray-300 p-2 hover:bg-yellow-100 active:bg-yellow-200"}>
          <img src={assets.order_icon} alt="" />
          <p className="">List Items</p>
        </NavLink>
      </div>
    </>
  );
};

export default SideBar;
