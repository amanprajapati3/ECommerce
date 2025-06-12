import React from "react";
import { assets } from "../assets/frontend_assets/assets.js";

const Footer = () => {
  return (
    <>
      <div className="flex justify-center flex-wrap sm:px-5 bg-gray-300 pt-5 py-7">
        <div className="text-center pl-5 pb-4">
          <a href="/">
            <img src={assets.logo} alt="" className="md:w-40 w-42" />
          </a>
          <p className="sm:w-[400px] text-left pt-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi nisi at ipsum reiciendis rem dolorem accusamus et recusandae, repellat tempore perferendis cupiditate voluptatum debitis.  
          </p>
        </div>
        <div className="text-center pl-5 pb-6">
          <h1 className="text-xl font-bold pb-5">COMPANY</h1>
          <ul>
            <li className="duration-300 transition-all hover:scale-110 hover:font-medium">
              <a href="/">Home</a>
            </li>
            <li className="duration-300 transition-all hover:scale-110 hover:font-medium">
              <a href="/about">About us</a>
            </li>
            <li className="duration-300 transition-all hover:scale-110 hover:font-medium">
              <a href="#">Delivery</a>
            </li>
            <li className="duration-300 transition-all hover:scale-110 hover:font-medium">
              <a href="#">Privacy policy</a>
            </li>
          </ul>
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold pb-5">GET IN TOUCH</h1>
          <ul>
            <li className="duration-300 transition-all hover:scale-110 hover:font-medium">
              <a href="#">+91 1234567898</a>
            </li>
            <li className="duration-300 pl-5 transition-all hover:scale-110 hover:font-medium">
              <a href="#">amanprajapati9871@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>
      <center className="py-4 bg-gray-300">
        Copyright 2024@ forever.com All rights reserved
      </center>
    </>
  );
};

export default Footer;
