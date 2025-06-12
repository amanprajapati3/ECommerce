import orderModel from "../models/orderModel.js";
import UserModel from "../models/User_Model.js";
import Stripe from "stripe";

// gateway initializer

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// place order using cash on delivery
const placeOrder = async (req, res) => {
  try {
    const { items, address, amount } = req.body;
    const userId = req.user.id;

    const orderData = {
      userId,
      items,
      address,
      amount,
      payment: false,
      paymentMethod: "COD",
      date: Date.now(),
    };

    const newOrder = await orderModel(orderData);
    await newOrder.save();

    await UserModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, msg: "Order Placed." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error });
  }
};

const stripeMethod = async (req, res) => {
  try {
    const { items, address, amount } = req.body;
    const userId = req.user.id;
    const { origin } = req.headers;

    const currency = "inr";
    const Delivery_Charges = 10;

    const orderData = {
      userId,
      items,
      address,
      amount,
      payment: false,
      paymentMethod: "stripe",
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => {
      const amount = Number(item.price);
      const quantity = Number(item.quantity);

      if (isNaN(amount) || isNaN(quantity)) {
        throw new Error("Invalid item data: amount or quantity is NaN");
      }

      return {
        price_data: {
          currency: currency,
          product_data: {
            name: item.name || "Item",
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity,
      };
    });

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery charges",
        },
        unit_amount: Math.round(Number(Delivery_Charges) * 100),
      },
      quantity: 1,
    });

    console.log(origin);
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.json({ success: false, message: error.message });
  }
};

// verify stripe
const verifyStripe = async (req,res) =>{
  try {
    
   const {orderId, success, } = req.body;
   const {userId}  = req.user.id;
   
   if(success === "true"){
     await orderModel.findByIdAndUpdate(orderId, {payment:true});
     await UserModel.findByIdAndUpdate(userId, {cartData: {}} );
     res.json({success:true})
   } else {
      await orderModel.findByIdAndDelete(orderId)
      res.json({success:false});
   }

  } catch (error) {
    
  }
}

// place order using razorPayMethod
const razorPayMethod = async (req, res) => {
  try {
    const { items, address, amount } = req.body;
    const userId = req.user.id;

    const orderData = {
      userId,
      items,
      address,
      amount,
      payment: false,
      paymentMethod: "razorpay",
      date: Date.now(),
    };

    const newOrder = await orderModel(orderData);
    await newOrder.save();

    await UserModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, msg: "Order Placed." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error });
  }
};

// user order data for frontend
const OrderData = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

// all order data for admin
const allOrder = async (req, res) => {
  try {
    const AllOrders = await orderModel.find({});
    res.json({ success: true, AllOrders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

// update order status for admin
const updataOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

export {
  placeOrder,
  stripeMethod,
  razorPayMethod,
  OrderData,
  allOrder,
  updataOrderStatus,
  verifyStripe
};
