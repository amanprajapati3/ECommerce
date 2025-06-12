import express from "express";
import cors from "cors";
import "dotenv/config";
import dotenv from "dotenv";
import connectDb from "./config/Mongodb.js";
import connectCloudinary from "./config/Cloudinary.js";
import UserRouter from "./routes/UserRoute.js";
import productRoute from "./routes/ProductRoutes.js";
import cartRoute from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRouter.js";

// App config
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
connectDb();
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors());

// api endpoints
app.use('/api/user/', UserRouter);
app.use('/api/product/', productRoute); 
app.use('/api/cart/', cartRoute);
app.use('/api/order/', orderRouter);
app.get("/", (req, res) => {
  res.send("api working successfully");
});

app.listen(port, () => 
  console.log(`Website is running at http://localhost:${port}`)
);
