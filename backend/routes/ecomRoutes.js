import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  isUserLoggedIn,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const ecomRouter = express.Router();

ecomRouter.post("/user/register", registerUser);
ecomRouter.post("/user/login", loginUser);
ecomRouter.post("/user/logout", logoutUser);
ecomRouter.get("/user/loggedIn", authMiddleware, isUserLoggedIn);

export default ecomRouter;
