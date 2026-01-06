import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Cart from "./pages/Cart.jsx";
import Home from "./pages/Home.jsx";
import Collection from "./pages/Collection.jsx";
import Product from "./pages/Product.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Order from "./pages/Order.jsx";
import ShopContextProvider from "./context/ShopContext.jsx";
import Registration from "./pages/Registration.jsx";
import {Toaster} from "react-hot-toast"
import Verify from "./pages/Verify.jsx";
import Kids from "./pages/Kids.jsx";
import Mens from "./pages/Mens.jsx";
import Women from "./pages/Women.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import User_profile from "./pages/User_profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/collection",
        element: <Collection />,
      },
      {
        path: "/product/:productId",
        element: <Product />,
      },
      {
        path: "/placeOrder",
        element: <PlaceOrder />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/registration",
        element: <Registration/>
      },
      {
        path: "/verify",
        element: <Verify/>
      },
      {
        path: "/kids",
        element: <Kids/>
      },
      {
        path: "/mens",
        element: <Mens/>
      },
      {
        path: "/women",
        element: <Women/>
      },
      {
        path: "/wishlist",
        element: <Wishlist/>
      },
      {
        path: "/profile",
        element: <User_profile/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ShopContextProvider>
      <RouterProvider router={router} />
      <Toaster/>
    </ShopContextProvider>
  </React.StrictMode>
);
