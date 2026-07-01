import express from "express";
const router = express.Router();
export default router;
import { createUser, loginUser } from "../controllers/User.Controller.js";
import { getUsers, updateUser } from "../controllers/User.Controller.js";
import { deleteUser } from "../controllers/User.Controller.js";
import { createAdmin } from "../controllers/Admin.Controller.js";
import User from "../models/User.Model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/token.js";
import { protect } from "../middleware/auth.middleware.js";

//user routes
router.post("/",createUser);
router.get("/", protect, getUsers);
router.put("/:id",protect, updateUser);
router.delete("/:id",protect, deleteUser);

//login routes
router.post("/login", loginUser);

//create token route
router.post("/refesh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res
      .status(401)
      .json({ success: false, message: "No refresh token" });
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = generateAccessToken({ _id: decoded.id });
    res.json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid refresh token" });
  }
});
