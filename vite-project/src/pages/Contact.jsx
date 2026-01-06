import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Contact = () => {
  return (
    <>
      <div className="flex justify-center my-10 mb-2 ml-2">
        <h1 className="text-left text-xl">CONTACT US</h1>
        <div className="w-[70px] mt-3 ml-2 bg-gray-800 h-[2px] font-bold"></div>
      </div>
      <div className="flex justify-center flex-wrap gap-5 my-10">
         <div className="flex justify-center"> 
         <img src={assets.contact_img} alt="" className="w-full h-[300px] md:h-[450px]" />
         </div>
         <div className="md:mt-10 pl-5">
            <h1 className="font-bold py-5 text-xl">Our Store</h1>
            <p>Om enclave Part-l <br /> Faridabad, Haryana, Indian</p>
            <p className="pt-5">
              Tel: +91 7217814501 <br />Email: amanprajapati9871@gmail.com
            </p>
            <h1 className="font-bold py-5 text-xl">Careers at Forever</h1>
            <p>Learn more about our teams and job openings.</p>
            <button className="my-4 rounded-md px-5 py-2 text-black border-2 bg-white hover:bg-black hover:text-white transition-all cursor-pointer duration-500">Explore Jobs</button>
         </div>
      </div>

{/* subscribe section */}
      <div className="flex justify-center mb-16">
        <div className="text-center">
          <h1 className="text-xl font-bold py-3">Subscribe now & get 20% off</h1>
          <p className="pb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum perferendis quaerat aut.</p>
          <div className="flex justify-center ">
             <input type="email" placeholder="Enter Your Email" className="text-gray-900 md:w-[360px] px-3 py-3 rounded-tl-md rounded-bl-md  outline-none border-2 border-gray-400 focus:bg-gray-300 focus:border-gray-400" />
             <button className="py-2 px-5 rounded-tr-md rounded-br-md cursor-pointer bg-black text-white hover:text-black hover:bg-white hover:border-2 transition-all duration-500">Subscribe</button>
          </div>

        </div>
      </div>
    </>
  );
};

export default Contact;
