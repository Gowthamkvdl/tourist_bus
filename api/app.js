import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import otpRoute from "./routes/otp.route.js"
import postRoute from  "./routes/post.route.js"
import reviewRoute from "./routes/review.route.js"
import path from "path";

import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
const PORT = 3000;
const app = express();
const allowedOrigins = [process.env.CLIENT_URL];


// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.resolve("uploads"))); 
app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against site script xss
app.use(xss());

app.use("/api/auth", authRoute);
app.use("/api/otp", otpRoute);
app.use("/api/post", postRoute);
app.use("/api/review", reviewRoute);
// app.use("/api/partner", partnerRoute);




app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on PORT ${PORT}`);
});
