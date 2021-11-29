require("dotenv").config();
const express = require("express");
const fileUploader = require("express-fileupload");
require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const categoryRoutes = require("./routes/category");
const couponRoutes = require("./routes/coupon");
const reviewRoutes = require("./routes/review");
const orderRoutes = require("./routes/order");

const app = express();

app.use(express.json());
app.use(fileUploader());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/coupon", couponRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/order", orderRoutes);

module.exports = app;