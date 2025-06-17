import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";

const Registration = () => {
  const [seePassword, setSeePassword] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { token, setToken, backend_url } = useContext(ShopContext);
  const HandlePassword = () => {
    setSeePassword(!password);
  };

  const handleRegistrationButton = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const response = await axios.post(backend_url + "/api/user/register", {
        name,
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("User Registered successfully");
      } else {
        toast.error("user already exist");
      }
    } catch (error) {
      console.log(error);
      toast.error("Please try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <>
      <div className="flex justify-center md:mt-20 mt-10">
        <div className="text-center">
          <div className="flex justify-center my-10 mb-2 ml-2">
            <h1 className="text-left text-xl">REGISTRATION</h1>
            <div className="w-[70px] mt-3 ml-2 bg-gray-800 h-[2px] font-bold"></div>
          </div>

          <form onSubmit={handleRegistrationButton}>
            <input
              type="text"
              required
              autoComplete="on"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              name="name"
              className="py-2 pl-5 w-full focus:text-black  my-2 rounded-md outline-none border-b-2 focus:bg-gray-300 transition-all duration-500 sm:w-[300px]"
            />{" "}
            <br />
            <input
              type="email"
              required
              autoComplete="on"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              className="py-2 pl-5 focus:text-black  my-2 rounded-md outline-none w-full border-b-2 focus:bg-gray-300 transition-all duration-500 sm:w-[300px]"
            />{" "}
            <br />
            <span  className="flex justify-between w-[300px] border-b-2 rounded-md ">
              <input
                required
                autoComplete="on"
                className="py-2 pl-2 focus:text-black  mt-2 w-full rounded-md outline-none "
                type={seePassword ? "password" : "text"}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter your password"
              />
              <label
                className="relative text-xl right-8 top-5"
                onClick={HandlePassword}
              >
                {seePassword ? <FaEyeSlash /> : <FaEye />}{" "}
              </label>
            </span>
            <div className="flex justify-between mt-2 ml-5">
              <h1 className="hover:border-b-2">
                <a href="#">Forgot your password?</a>
              </h1>
              <h1 className="hover:border-b-2">
                <NavLink to="/login">LogIn</NavLink>
              </h1>
            </div>
            <center>
              <button
                disabled={loading}
                className="my-5 bg-black text-white hover:bg-gray-800  active:bg-black transition-all duration-100 active:scale-95 px-5 py-2 rounded-md cursor-pointer "
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Register"
                )}
              </button>
            </center>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
