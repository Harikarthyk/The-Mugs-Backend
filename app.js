require("dotenv").config();
const express = require("express");
require("./config/database");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
// const cartRoutes = require("./roxutes/cart");
const categoryRoutes = require("./routes/category");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/category", categoryRoutes);
// app.use("/v1/cart", cartRoutes);

module.exports = app;