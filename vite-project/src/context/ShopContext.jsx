import { createContext, useState, useEffect } from "react";
// import { products } from "../assets/frontend_assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [cartItem, setCartItem] = useState({});
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [products, setProduct] = useState([]);
  const [token, setToken] = useState("");
  const [loader, setLoader] = useState(false);

  // NEW: store user data
  const [userData, setUserData] = useState(null);

  // add to cart function
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("please select size.");
      return;
    }

    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItem(cartData);

    if (token) {
      try {
        await axios.post(
          backend_url + "/api/cart/addToCart",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Add to cart failed");
      }
    }
  };

  // update quantity function
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);

    if (token) {
      try {
        await axios.post(
          backend_url + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Update failed");
      }
    }
  };

  // counting the cart
  const getCartCount = () => {
    let cartCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            cartCount += cartItem[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return cartCount;
  };

  // Debugging: Check if cartItem updates
  useEffect(() => {
    console.log("cartItem Updated in Context:", cartItem);
  }, [cartItem]);

  // total amount function
  const totalAmount = () => {
    let amount = 0;
    for (const items in cartItem) {
      // find the corresponding product
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            // guard if itemInfo undefined
            amount += (itemInfo?.price ?? 0) * cartItem[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return amount;
  };

  // data fetching of product from api
  const ProductData = async () => {
    try {
      setLoader(true);
      console.log("backend_url:", backend_url);
      const response = await axios.get(backend_url + "/api/product/list");
      if (response?.data?.success) {
        console.log("Product list:", response.data);
        setProduct(response.data.products || []);
      } else {
        toast.error(response?.data?.message || "Failed to fetch products");
      }
    } catch (error) {
      console.log(error);
      toast.error("fetching problem");
    } finally {
      setLoader(false);
    }
  };

  // get user data (renamed to fetchUserData for clarity)
  const fetchUserData = async () => {
    try {
      setLoader(true);
      console.log("fetching user data from", backend_url);
      const response = await axios.get(backend_url + "/api/user/userData", {
        headers: { token },
      });

      if (response?.data?.success) {
        console.log("userData response:", response.data);
        // adapt this depending on your API shape:
        // common shapes: response.data.user || response.data.data || response.data
        const payload =
          response.data.user ??
          response.data.data ??
          response.data.payload ??
          response.data;
        setUserData(payload);
      } else {
        toast.error(response?.data?.message || "Failed to fetch user data");
      }
    } catch (error) {
      console.log(error);
      toast.error("fetching problem");
    } finally {
      setLoader(false);
    }
  };

  // getting user cart
  // Accept optional tokenParam so you can call it immediately after setting token
  const getUserCart = async (tokenParam) => {
    const authToken = tokenParam ?? token;
    if (!authToken) return;

    try {
      // axios.post(url, body, config)
      const response = await axios.post(
        backend_url + "/api/cart/get",
        {}, // empty body
        { headers: { token: authToken } }
      );
      if (response?.data?.success) {
        setCartItem(response.data.cartData || {});
      } else {
        // log but don't crash
        console.log("getUserCart response:", response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to fetch cart");
    }
  };

  useEffect(() => {
    ProductData();
  }, []);

  useEffect(() => {
    // If token exists in localStorage, set it and fetch cart
    const stored = localStorage.getItem("token");
    if (!token && stored) {
      setToken(stored);
      // pass stored token so getUserCart runs with correct token (setState is async)
      getUserCart(stored);
      // also fetch user data now that we have token
      fetchUserData();
    }
  }, []);

  return (
    <ShopContext.Provider
      value={{
        products,
        search,
        setSearch,
        cartItem,
        setCartItem,
        addToCart,
        getCartCount,
        updateQuantity,
        totalAmount,
        backend_url,
        token,
        setToken,
        loader,
        userData,
        fetchUserData,
        getUserCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
