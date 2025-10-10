import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const About = () => {
  return (
    <>
      <div className="">
        <div className="flex justify-center my-10 mb-2 ml-2">
          <h1 className="text-left text-xl">ABOUT US</h1>
          <div className="w-[70px] mt-3 ml-2 bg-gray-800 h-[2px] font-bold"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:mx-24 sm:mx-8 mx-2 mt-9">
          <div className="flex justify-center">
            {" "}
            <img
              src={assets.about_img}
              alt=""
              className="h-[300px] sm:h-[600px]"
            />
          </div>

          <div className="lg:mt-16">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              libero odit temporibus rerum, omnis ullam. Quae deserunt soluta,
              aliquam voluptatum sunt, consectetur, corrupti sapiente molestiae
              omnis{" "}
              <span className="hidden sm:block">
                consequatur a odio illum?Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Assumenda explicabo ratione commodi velit?
                Commodi id nam iure accusantium sit ullam.
              </span>{" "}
            </p>{" "}
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              libero odit temporibus rerum, omnis ullam. Quae deserunt soluta,
              aliquam voluptatum sunt, consectetur, corrupti sapiente molestiae
              omnis{" "}
              <span className="hidden sm:block">
                consequatur a odio illum?Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Assumenda explicabo ratione commodi velit?
                Commodi id nam iure accusantium sit ullam.
              </span>{" "}
            </p>{" "}
            <br />
            <h1 className="py-3 font-bold">Our Mission</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
              illum vel voluptatum rem non libero, expedita hic officiis est
              vero maiores fugit atque. Molestiae.sit{" "}
              <span className="hidden sm:block">
                {" "}
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laborum libero odit temporibus rerum, omnis ullam. Quae
                  deserunt soluta, aliquam voluptatum sunt, consectetur,
                  corrupti sapiente molestiae omnis{" "}
                  <span className="hidden sm:block">
                    consequatur a odio illum?Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Assumenda explicabo ratione
                    commodi velit? Commodi id nam iure accusantium sit ullam.
                  </span>{" "}
                </p>{" "}
                <br />
              </span>
            </p>
          </div>
        </div>
        <div className="">
          <div className="flex justify-center my-10 mb-10 ml-2">
            <h1 className="text-left text-xl font-medium">WHY CHOOSE US</h1>
            <div className="w-[70px] mt-3 ml-2 bg-gray-800 h-[2px] font-bold"></div>
          </div>
          <div className="flex justify-center flex-wrap gap-28 mt-5">
            <div className="w-[300px]">
             <p className="pb-5"><b>Quality Assurance : </b></p>
             <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque soluta possimus deleniti veniam inventore distinctio commod</p>
            </div>
            <div className="w-[300px]">
             <p className="pb-5"><b>Convienince : </b></p>
             <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque soluta possimus deleniti veniam inventore distinctio commod</p>
            </div>
            <div className="w-[300px]">
             <p className="pb-5"><b>Acceptional Customer Service : </b></p>
             <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque soluta possimus deleniti veniam inventore distinctio commod</p>
            </div>
          </div>
        </div>

        {/* subscribe section */}
      <div className="flex justify-center mb-16 mt-12">
        <div className="text-center">
          <h1 className="text-xl font-bold py-3">Subscribe now & get 20% off</h1>
          <p className="pb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum perferendis quaerat aut.</p>
          <div className="flex justify-center ">
             <input type="email" placeholder="Enter Your Email" className="text-gray-900 md:w-[360px] px-3 py-3 rounded-tl-md rounded-bl-md  outline-none border-2 border-gray-400 focus:bg-gray-300 focus:border-gray-400" />
             <button className="py-2 px-5 rounded-tr-md rounded-br-md cursor-pointer bg-black text-white hover:text-black hover:bg-white hover:border-2 transition-all duration-500">Subscribe</button>
          </div>

        </div>
      </div>
      </div>
    </>
  );
};

export default About;
