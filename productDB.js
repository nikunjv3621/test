require("dotenv").config();
const connectDB = require("./db/conn");
const Product = require("./model/products");

const ProductJson = require("./products.json")

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        await Product.deleteMany();
        await Product.create(ProductJson)
        console.log("Ready");
    } catch (error) {
        console.log(error);
    }
};


start();