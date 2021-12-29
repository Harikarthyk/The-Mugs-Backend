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
const statsRoutes = require("./routes/stats");
const transactionRoutes = require("./routes/transaction");
const bannerRoutes = require("./routes/banner");
const inviteRoutes = require("./routes/invite");

const app = express();

app.use(express.json());
app.use(fileUploader());
app.use(cookieParser());
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/coupon", couponRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/transaction", transactionRoutes);
app.use("/api/v1/stats", statsRoutes);
app.use("/api/v1/banner", bannerRoutes);
app.use("/api/v1/invite", inviteRoutes);

module.exports = app;