require("dotenv").config();
const express = require("express");
require("./config/database");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/v1", userRoutes);

module.exports = app;