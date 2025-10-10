import { useContext } from "react";
import LatestCollection from "../components/LatestCollection.jsx";
import Policy from "../components/Policy.jsx";
import { ShopContext } from "../context/ShopContext.jsx";
import ProductItems from "../components/ProductItems.jsx";
import { NavLink } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import HeroSection from "./HeroSection.jsx";
import VideoSection from "./VideoSection.jsx";

const Home = () => {
  const { products, loader } = useContext(ShopContext);

  const men = products.filter((men) => men.category === "Men");
  const women = products.filter((women) => women.category === "Women");
  const kid = products.filter((kid) => kid.category === "Kids");

  return (
    <>
      {/* hero page */}
      <HeroSection />

      {/* whatsapp integration */}
      <div className="fixed sm:bottom-5 bottom:10 right-5 z-20">
        <a
          href="https://wa.me/917217814501?text=Hi%20there%2C%20I%20have%20a%20question"
          target="_blank"
          class="whatsapp-sticky"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
            alt="WhatsApp"
            className="sm:w-20 w-12 "
          />
        </a>
      </div>

      <div className="flex justify-center">
        {loader ? <Loader/> : <VideoSection/>}
      </div>

      {/* collection section */}
      <div className="flex justify-center  mt-10">
        {loader ? <Loader /> : <LatestCollection />}
      </div>

      {/* Mens section */}
      <div className=" mt-5 sm:mx-10">
        <div className="flex justify-center my-3">
          <h1 className="text-center text-3xl font-mono font-semibold">Mens</h1>
        </div>
        <p className="text-center pb-5 sm:px-5 px-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit,
          iure. Lorem ipsum dolor sit amet.
        </p>

        <div className="sm:flex justify-center grid grid-cols-2 text-center mb-10 flex-wrap sm:gap-1  ">
          {loader ? (
            <Loader />
          ) : (
            men.slice(0, 4).map((item, index) => (
              <div className=" ">
                <ProductItems
                  key={index}
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                   originalPrice={item.OriginalPrice}
                />
              </div>
            ))
          )}
        </div>
        <center>
          <button className="px-5 py-2 rounded-md bg-black text-white hover:bg-gray-800 cursor-pointer ">
            <NavLink to={"/mens"}>Shop More</NavLink>
          </button>
        </center>
      </div>

      {/* women section */}

      <div className=" mt-5 sm:mx-10">
        <div className="flex justify-center my-3">
          <h1 className="text-center text-3xl font-mono font-semibold">
            Womans
          </h1>
        </div>
        <p className="text-center pb-5 sm:px-5 px-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit,
          iure. Lorem ipsum dolor sit amet.
        </p>

        <div className="sm:flex justify-center grid grid-cols-2 text-center mb-10 flex-wrap sm:gap-1  ">
          {loader ? (
            <Loader />
          ) : (
            women.slice(0, 4).map((item, index) => (
              <div className=" ">
                <ProductItems
                  key={index}
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                   originalPrice={item.OriginalPrice}
                />
              </div>
            ))
          )}
        </div>
        <center>
          <button className="px-5 py-2 rounded-md bg-black text-white hover:bg-gray-800  cursor-pointer ">
            <NavLink to={"/women"}>Shop More</NavLink>
          </button>
        </center>
      </div>

      {/* kids section */}

      <div className=" mt-5 sm:mx-10">
        <div className="flex justify-center my-3">
          <h1 className="text-center text-3xl font-mono font-semibold">Kids</h1>
        </div>
        <p className="text-center pb-5 sm:px-5 px-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit,
          iure. Lorem ipsum dolor sit amet.
        </p>

        <div className="sm:flex justify-center grid grid-cols-2 text-center mb-10 flex-wrap sm:gap-1">
          {loader ? (
            <Loader />
          ) : (
            kid.slice(0, 4).map((item, index) => (
              <div className=" ">
                <ProductItems
                  key={index}
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                   originalPrice={item.OriginalPrice}
                />
              </div>
            ))
          )}
          {}
        </div>
        <center>
          <button className="px-5 py-2 rounded-md bg-black text-white hover:bg-gray-800  cursor-pointer ">
            <NavLink to={"/kids"}>Shop More</NavLink>
          </button>
        </center>
      </div>

      {/* policy section */}
      <div className="flex justify-center text-center mt-10">
        <Policy />
      </div>

      {/* subscribe section */}
      <div className="flex justify-center sm:mx-0 mb-16">
        <div className="text-center">
          <h1 className="text-xl font-bold py-3">
            Subscribe now & get 20% off
          </h1>
          <p className="pb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            perferendis aut.
          </p>
          <div className="flex justify-center mx-5 sm:mx-0 ">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="text-gray-900 md:w-[360px] px-2 py-2 rounded-l-xl outline-none border-2 border-gray-400 focus:bg-gray-300 focus:border-gray-400"
            />
            <button className="py-2 px-5 rounded-r-xl cursor-pointer bg-black text-white active:scale-95">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
