require("dotenv").config();
require("express-async-errors");

// Express
const express = require("express");
const app = express();

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// database
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");

// Middelware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.static("./public"));
app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
