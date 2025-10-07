import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";
import List from "./pages/List";
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';
import Update from "./pages/Update";

export const backend_url = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, SetToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  );

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <>
      <div>
        <ToastContainer />
        {token === "" ? (
          <Login setToken={SetToken} />
        ) : (
          <>
            <Navbar setToken={SetToken} />
            <hr />
            <div className="flex w-full">
              <SideBar />
              <div className="sm:w-[90%] my-5 sm:mx-5 mx-1">
                <Routes>
                  <Route path="/" element={<AddProduct />} />
                  <Route path="/add" element={<AddProduct token={token} />} />
                  <Route path="/order" element={<Orders token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/update-product/:id" element={<Update token={token} />} /> 
                </Routes>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;
