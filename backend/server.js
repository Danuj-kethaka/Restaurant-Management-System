import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"
import cookieParser from "cookie-parser";
import userRoutes from "./routes/User.route.js";
import adminRoutes from "./routes/Admin.route.js";
import menuRoutes from "./routes/Menu.Route.js";
import { configureCloudinary } from "./config/cloudinary.js";
import path from "path";
import cors from "cors";

dotenv.config();

configureCloudinary();

const app = express();
const PORT = process.env.PORT;

const __dirname = path.resolve();

console.log(process.env.MONGO_URI);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:5173",
    credentials: true,
  })
);

//User Routes 
app.use("/api/users",userRoutes);

//Admin Routes
app.use("/api/admin",adminRoutes);

//Menu Routes
app.use("/api/menu",menuRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "frontend", "dist");
  app.use(express.static(frontendPath));
  app.get((req, res, next) => {
    if (!req.path.startsWith("/api")) {
      res.sendFile(path.join(frontendPath, "index.html"));
    } else {
      next();
    }
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});

