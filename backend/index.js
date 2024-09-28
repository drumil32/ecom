import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import ecomRouter from "./routes/ecomRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cookieParser from "cookie-parser";
import authMiddleware from "./middlewares/authMiddleware.js";

const corsOptions = {
  origin: "http://localhost:5173", // Your frontend origin
  credentials: true, // This allows the server to accept cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"], // Allowed methods

};
// {
//   Authorization: Bearer 34rddit8034fioe905rueiohfioew8y54894efhuoewihr8943hfiuo4tu
// }

const PORT = process.env.PORT;
const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", ecomRouter);
app.use("/api/product", productRouter);

try {
  await mongoose.connect(
    process.env.MONGO_URL, { dbName: process.env.DB }
  );
  app.listen(PORT, () => console.log(`SERVER STARTED AT PORT ${PORT}`));
} catch (err) {
  console.log(err);
}

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error. Will Fix it soon' });
})

// review
/*
  productId => Types.ObjectId
  rating => number
  comment => string
  userId => Types.ObjectId
*/