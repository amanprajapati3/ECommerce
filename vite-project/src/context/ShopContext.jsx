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
  const [token, setToken] = useState('');

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

    if(token)
    {
      try {
        
        await axios.post(backend_url + '/api/cart/addToCart', {itemId, size}, {headers: {token}});

      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }

  };

  // update quantity function
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);

    if(token){
      try {
        
          await axios.post(backend_url + '/api/cart/update', {itemId, size, quantity}, {headers:{token}});

      } catch (error) {
        console.log(error);
        toast.error(error.massage);
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
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            amount += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return amount;
  };

  // data fetching of product from api
  const ProductData = async() =>{
    try {
      console.log(backend_url);
    const response = await axios.get(backend_url + '/api/product/list');
    if(response.data.success){
      console.log(response.data);
      setProduct(response.data.products);
    }else{
      toast.error(response.data.message);
    }

    } catch (error) {
      console.log(error);
      toast.error("fetching problem")
    }
  }

  // getting user cart
 const getUserCart = async() =>{

  try {
    
    const response = await axios.post(backend_url + '/api/cart/get', {headers:{token}})
    if(response.data.success){
      setCartItem(response.data.cartData);
    }

  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }

 }

  useEffect(()=>{
    ProductData();
  }, []);

  useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'));
      getUserCart(localStorage.getItem('token'));
    }
  },[])

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
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
