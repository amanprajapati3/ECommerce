
import React from 'react';
import { ShopContext } from '../context/ShopContext';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const User_profile = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://forever-backend-lyart.vercel.app//api/user/userData"
        );
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error); 
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex sm:my-10 my-5 justify-center text-center">
        <h1 className="text-left sm:text-3xl font-bold text-xl">My Profile</h1>
        <div className="w-[70px] mt-1 ml-2 bg-gray-800 h-[2px]" />
      </div>

      <div className="flex justify-center text-center">
        <div>
          <center>
            <img
              className="rounded-full sm:w-72 w-48"
              src="https://media.lordicon.com/icons/wired/flat/268-avatar-man.gif"
              alt="avatar"
            />
          </center>

          <div className="mt-4 text-lg">
            <p>
              <strong>Name:</strong> {user?.name || "Not available"}
            </p>

            <p>
              <strong>Email:</strong> {user?.email || "Not available"}
            </p>

            <p>
              <strong>Phone:</strong> {user?.phone || "Not available"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default User_profile;
