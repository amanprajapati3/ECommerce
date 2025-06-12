import UserModel from "../models/User_Model.js";

// add products to cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await UserModel.findById(userId);
    let cartData = await userData.cartData;
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
    await UserModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, msg: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: true, msg: error.message });
  }
};

// update products
const updateCart = async (req, res) => {
  try {
    const { itemId, size, userId, quantity } = req.body;
    const userData = await UserModel.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;
    await UserModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, msg: "Cart Updated." });
  } catch (error) {
    console.log(error);
    res.json({ success: true, msg: error.message });
  }
};

// get user cart data
const userCartData = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await UserModel.findById(userId);
    let cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: true, msg: error.message });
  }
};

export { addToCart, updateCart, userCartData };
