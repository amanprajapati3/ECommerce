import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { backend_url } from "../App";
import { toast } from "react-toastify";

const Login = ({setToken}) => {
  const [SeePassword, setSeePassword] = useState(true);
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const HandlePassword = () => {
    setSeePassword(!SeePassword);
  };

  const OnSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backend_url + "/api/user/adminLogin", {
        email,
        password,
      });
      if(response.data.success){
        setToken(response.data.token);
      } else {
        toast.error("Invalid password or user name try again.");
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-20 mx-5 sm:mt-28">
        <div className="border-2 border-gray-300 p-5 w-[350px] sm:w-[500px]">
          <label
            htmlFor=""
            className="text-xl md:text-2xl text-center font-bold font-mono"
          >
            Admin Panel
          </label>
          <form action="" className="mt-5" onSubmit={OnSubmitHandler}>
            <h1 className="font-bold">Email Address : </h1>
            <input
              type="email"
              placeholder="Enter Email address"
              required
              onChange={(e) => SetEmail(e.target.value)}
              value={email}
              className="p-2 text-gray-900 rounded-md my-2 border-2 w-full border-gray-400 outline-none focus:bg-gray-300"
            />
            <h1 className="font-bold    ">Password : </h1>
            <div className="flex w-full">
              <input
                type={SeePassword ? "password" : "text"}
                placeholder="Enter Email address"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="p-2 text-gray-900 rounded-md my-2  border-2 w-full border-gray-400 outline-none focus:bg-gray-300"
              />
              <label
                className="relative text-xl right-8 top-5"
                onClick={HandlePassword}
              >
                {SeePassword ? <FaEyeSlash /> : <FaEye />}{" "}
              </label>
            </div>
            <center>
              <input
                type="submit"
                value={"Login"}
                className="text-white bg-black hover:bg-gray-900 active:bg-black my-5 w-[70%] rounded-md py-2 cursor-pointer"
              />
            </center>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
