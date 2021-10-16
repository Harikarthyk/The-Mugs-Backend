const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const usersRoute = require('./routes/user');
const cartsRoute = require('./routes/cart');

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

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Server is up and running at ${PORT}`));