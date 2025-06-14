import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [SeePassword, setSeePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { token, setToken, backend_url } = useContext(ShopContext);
  const HandlePassword = () => {
    setSeePassword(!SeePassword);
  };

  const handleLoginButton = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {
      const response = await axios.post(backend_url + "/api/user/login", {
        email,
        password,
      });
      if (response.data.success) {
        console.log(response.data);
        setToken(response.data.token);
        toast.success("User Logged successfully");
        localStorage.setItem("token", response.data.token);
      } else {
        toast.error("Invalid Credential");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
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
            <h1 className="text-left text-xl">LOGIN</h1>
            <div className="w-[70px] mt-3 ml-2 bg-gray-800 h-[2px] font-bold"></div>
          </div>

          <form onSubmit={handleLoginButton} className="">
            <input
              type="email"
              required
              autoComplete="on"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              className="py-2 pl-5 font-bold focus:text-black focus:font-bold my-2 rounded-md outline-none border-2 focus:bg-sky-100 focus:border-sky-400 sm:w-[300px]"
            />{" "}
            <br />
            <div className="flex justify-center w-full">
              <input
                required
                autoComplete="on"
                className="py-2 pl-2 focus:text-black focus:font-bold mt-2 rounded-md outline-none border-2 focus:bg-sky-100 focus:border-sky-400 sm:w-[300px]"
                type={SeePassword ? "password" : "text"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <label
                className="relative text-xl right-8 top-5"
                onClick={HandlePassword}
              >
                {SeePassword ? <FaEyeSlash /> : <FaEye />}{" "}
              </label>
            </div>
            <div className="flex justify-between gap-5 mt-2">
              <h1 className="hover:border-b-2">
                <a href="#">Forgot your password?</a>
              </h1>
              <h1 className="hover:border-b-2">
                <NavLink to="/registration">Create account</NavLink>
              </h1>
            </div>
            <center>
              <button
                disabled={loading}
                className="my-5 bg-black text-white focus:bg-gray-800 active:bg-black active:scale-95 px-5 py-2 rounded-md cursor-pointer "
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

export default Login;
