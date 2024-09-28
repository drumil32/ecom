import express from "express";
import {
  createProduct,
  getAllProducts,
  deleteProduct,
} from "../controllers/productController.js";
import { createReview, getReviewsByProductId } from "../controllers/reviewController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const productRouter = express.Router();

productRouter.post("/", authMiddleware, createProduct);
productRouter.get("/", getAllProducts);
productRouter.delete("/:id", authMiddleware, deleteProduct);

productRouter.post("/review/:productId", authMiddleware, createReview);
productRouter.get('/review/:productId', getReviewsByProductId);
productRouter.delete('/review/:id', authMiddleware, deleteReview);

export default productRouter;
