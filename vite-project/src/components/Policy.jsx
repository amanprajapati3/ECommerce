import React from "react";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const Policy = () => {
  return (
    <>
      <div className="flex justify-center flex-wrap gap-3 my-10 sm:gap-6 md:gap-10 lg:gap-16 items-center">
        <div className="text-center cursor-pointer hover:shadow-2xl hover:shadow-gray-600 p-5 duration-300 transition-all">
          <div className=" my-4 flex justify-center text-3xl">
            {" "}
            <MdOutlineCurrencyExchange />
          </div>
          <label htmlFor="" className="font-bold py-1">Easy Exchange Policy</label>
          <p className="py-1">We offer hassle free exchange policy</p>
        </div>
        <div className="text-center cursor-pointer hover:shadow-2xl hover:shadow-gray-600 p-5 duration-300 transition-all">
          <div className=" my-4 flex justify-center text-3xl">
            {" "}
            <SiTicktick />
          </div>
          <label htmlFor="" className="font-bold py-1">7 Days Return Policy</label>
          <p className="py-1">We provide 7 days free return policy</p>
        </div>
        <div className="text-center cursor-pointer hover:shadow-2xl hover:shadow-gray-600 p-5 duration-300 transition-all">
          <div className=" my-4 flex justify-center text-3xl">
            {" "}
            <TfiHeadphoneAlt />
          </div>
          <label htmlFor="" className="font-bold py-1">Best costumer support</label>
          <p className="py-1">we provide 24/7 customer support</p>
        </div>
      </div>
    </>
  );
};

export default Policy;
