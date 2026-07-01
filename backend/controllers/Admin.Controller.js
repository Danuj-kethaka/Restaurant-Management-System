import User from "../models/User.Model.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("Admin@1234", 10);
  const admin = new User({
    name: "Admin",
    email: "Admin1234@gmail.com",
    password: hashedPassword,
    role: "admin",
  });
  await admin.save();
  console.log("Admin Created Successfully");
};
