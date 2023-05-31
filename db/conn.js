const mongoose = require("mongoose");

const connectDB = (uri) => {
    console.log("💎 MongoDB Connect");
    return mongoose.connect(uri);
}

module.exports = connectDB;