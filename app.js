require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/conn");
const port = process.env.PORT || 5000;

const product_routes = require("./routes/products");

app.get("/", (req, res) => {
    res.send("API Route Working");
})

// Middeware or set router
app.use("/api/products", product_routes);

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(port, () => {
            console.log(`🧨 Server live at`,port)
        });
    } catch (error) {
        console.log(error);
    }
}

start();