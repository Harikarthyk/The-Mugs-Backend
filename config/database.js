const mongoose = require('mongoose')

const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log(`MongoDB Connection Established.`) })
    .catch((error) => { console.log(`Error in MongoDB Connection ${error}`) });

