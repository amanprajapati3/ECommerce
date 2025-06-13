import { useContext } from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import LatestCollection from "../components/LatestCollection.jsx";
import Policy from "../components/Policy.jsx";
import { ShopContext } from "../context/ShopContext.jsx";
import ProductItems from "../components/ProductItems.jsx";
import { NavLink } from "react-router-dom";

const Home = () => {
  const { products } = useContext(ShopContext);

  const men = products.filter((men) => men.category === "Men");
  const women = products.filter((women) => women.category === "Women");
  const kid = products.filter((kid) => kid.category === "Kids");

  return (
    <>
      {/* hero page */}
      <div className="relative">
        <div className="absolute inset-0 z-0">
          <img
            src={assets.hero_img}
            alt="Background"
            className="w-full h-full object-cover filter brightness-75"
          />
        </div>
        <div className="relative  text-center  items-center pb-28 pt-16 md:pb-32 md:pt-44">
          <div className="flex from-green-600 via-yellow-600 to-white bg-gradient-to-r bg-clip-text text-transparent text-3xl sm:text-5xl justify-center mb-2 ml-2">
            <h1 className="text-left mb-5 font-semibold">Our BestSeller</h1>
          </div>
          <h1 className="font-sans from-green-600 via-red-600 to-violet-600 bg-gradient-to-r bg-clip-text text-transparent font-semibold text-3xl sm:text-5xl">
            Wear Fashion Wear Style
          </h1>
          <p className="py-3 font-semibold text-xl from-gray-800 via-blue-400 to-green-600 bg-gradient-to-r bg-clip-text text-transparent ">
            Clothes Doesn't defines Your Beauty, It defines Your Personality
          </p>
        </div>
      </div>

      {/* collection section */}
      <div className="flex justify-center text-center mt-10">
        <LatestCollection />
      </div>

      {/* Mens section */}
      <div className="text-center mt-5 sm:mx-10">
        <div className="flex justify-center my-3">
          <h1 className="text-center text-3xl font-mono font-semibold">Mens</h1>
        </div>
        <p className="text-center pb-5 sm:px-5 px-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit,
          iure. Lorem ipsum dolor sit amet.
        </p>

        <div className="flex justify-center sm:mx-2 mb-10 flex-wrap sm:gap-6 gap-4">
          {men.slice(0, 6).map((item, index) => (
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
        <center>
          <button className="px-5 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-600 cursor-pointer ">
            <NavLink to={"/mens"}>Shop More</NavLink>
          </button>
        </center>
      </div>

      {/* women section */}

      <div className="text-center mt-5 sm:mx-10">
        <div className="flex justify-center my-3">
          <h1 className="text-center text-3xl font-mono font-semibold">Womans</h1>
        </div>
        <p className="text-center pb-5 sm:px-5 px-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit,
          iure. Lorem ipsum dolor sit amet.
        </p>

        <div className="flex justify-center sm:mx-2 mb-10 flex-wrap sm:gap-6 gap-4">
          {women.slice(0, 6).map((item, index) => (
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
        <center>
          <button className="px-5 py-2 rounded-md bg-pink-700 text-white hover:bg-pink-600 cursor-pointer ">
            <NavLink to={"/women"}>Shop More</NavLink>
          </button>
        </center>
      </div>

      {/* kids section */}

      <div className="text-center mt-5 sm:mx-10">
        <div className="flex justify-center my-3">
          <h1 className="text-center text-3xl font-mono font-semibold">Kids</h1>
        </div>
        <p className="text-center pb-5 sm:px-5 px-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit,
          iure. Lorem ipsum dolor sit amet.
        </p>

        <div className="flex justify-center sm:mx-2 mb-10 flex-wrap sm:gap-6 gap-4">
          {kid.slice(0, 6).map((item, index) => (
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
        <center>
          <button className="px-5 py-2 rounded-md bg-red-700 text-white hover:bg-red-600 cursor-pointer ">
            <NavLink to={"/kids"}>Shop More</NavLink>
          </button>
        </center>
      </div>

      {/* policy section */}
      <div className="flex justify-center text-center mt-10">
        <Policy />
      </div>

      {/* subscribe section */}
      <div className="flex justify-center mb-16">
        <div className="text-center">
          <h1 className="text-xl font-bold py-3">
            Subscribe now & get 20% off
          </h1>
          <p className="pb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            perferendis quaerat aut.
          </p>
          <div className="flex justify-center gap-2 ">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="text-gray-900 md:w-[360px] px-3 py-3 rounded-md outline-none border-2 border-gray-400 focus:bg-gray-300 focus:border-gray-400"
            />
            <button className="py-2 px-5 rounded-md cursor-pointer bg-black text-white hover:text-black hover:bg-white hover:border-2 transition-all duration-500">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
