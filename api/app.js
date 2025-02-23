import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import path from "path";

import authRoute from "./routes/auth.route.js";
import otpRoute from "./routes/otp.route.js";
import postRoute from "./routes/post.route.js";
import reviewRoute from "./routes/review.route.js";

const PORT = 3000;
const app = express();

// ✅ Define allowed origins properly
const allowedOrigins = [
  "https://touristbus.onrender.com", // ✅ Your frontend URL
  "http://localhost:5173", // ✅ Allow local development
];

// ✅ Correct CORS configuration
app.use(
  cors({
    origin: allowedOrigins, // ✅ Allow only specific origins
    credentials: true, // ✅ Allow cookies & auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Middleware Setup
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(xss());

// ✅ Static file serving
app.use("/uploads", express.static(path.resolve("uploads")));

// ✅ API Routes
app.use("/api/auth", authRoute);
app.use("/api/otp", otpRoute);
app.use("/api/post", postRoute);
app.use("/api/review", reviewRoute);

// ✅ Debugging logs
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log(`Origin: ${req.headers.origin}`);
  next();
});

// ✅ Start Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on PORT ${PORT}`);
});
