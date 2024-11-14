import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";

import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [process.env.CLIENT_URL, process.env.PARTNER_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [process.env.CLIENT_URL];
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
// app.use("/api/otp", otpRoute);
// app.use("/api/post", postRoute);
// app.use("/api/user", userRoute);
// app.use("/api/partner", partnerRoute);




app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
