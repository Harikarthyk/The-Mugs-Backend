const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const usersRoute = require('./routes/user');
const cartsRoute = require('./routes/cart');
const productsRoute = require('./routes/product');
const ordersRoute = require('./routes/order');
const categoriesRoute = require('./routes/category');

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Established"))
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use(cors());

app.use('/api/users',usersRoute);
app.use('/api/carts', cartsRoute);
app.use('/api/products', productsRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/orders', ordersRoute);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Server is up and running at ${PORT}`));