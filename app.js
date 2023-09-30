require("dotenv").config();

// Express
const express = require("express");
const app = express();

// database
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRoute");
const categoryRouter = require("./routes/categoryRoute");
const productRouter = require("./routes/productRoute");

// Middelware

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`server is listenning on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
