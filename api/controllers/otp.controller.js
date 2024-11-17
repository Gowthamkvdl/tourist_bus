import axios from "axios";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const sendOtp = async (req, res) => {
  const { phoneNumber } = req.body;
  const apiKey = process.env.OTP_SECRET_KEY;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate OTP and convert to string

  if (phoneNumber.length !== 10) {
    return res.status(400).json({ message: "Invalid phone number" });
  }

  const smsData = {
    route: "otp",
    variables_values: otp,
    numbers: phoneNumber,
  };

  try {
    const storeOtp = await prisma.otp.create({
      data: {
        otp: otp,
        phone: phoneNumber,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      },
    });

    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      smsData,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    console.log("SMS sent Successfully: ", response.data);

    // Check if SMS was sent successfully
    if (response.data.return) {
      // Store OTP in the database

      res.status(200).json({ message: "OTP sent and stored successfully" });
    } else {
      res
        .status(500)
        .json({ message: "Something went wrong while sending OTP" });
    }
  } catch (error) {
    console.error("Error sending SMS: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};    

export const verifyOtp = async (req, res) => {
  
  const { phoneNumber, otp } = req.body;

  try {
    // Find the OTP in the database
    const otpExists = await prisma.otp.findFirst({
      where: {
        phone: phoneNumber,
        // otp: otp,
        expiresAt: {
          gte: new Date(), // Ensure OTP is not expired
        },
      },
    });

    // If OTP does not exist or is expired, return an error
    if (!otpExists) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Clear OTP after successful verification
    await prisma.otp.deleteMany({
      where: {
        phone: phoneNumber,
        expiresAt: {
          gte: new Date(),
        },
      },
    });

    // Check if user exists in either `cater` or `server` table
    let userExists;

    userExists = await prisma.user.findUnique({
      where: { phone: phoneNumber },
    });   

    // If user exists, check if they are banned
    if (userExists && userExists.isBanned) {
      console.log("hello");
      return res.status(400).json({
        message:
          "Your account has been banned. Please contact our customer support for assistance.",
      });
    }

    if (userExists) {
      // Generate a cookie token and send it to the user
      const tokenDuration = 1000 * 60 * 60 * 24 * 7; // 1 week

      const token = jwt.sign(
        { id: userExists.id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: tokenDuration }
      );

      return res
        .cookie("token", token, {
          httpOnly: false,
          secure: true,
          sameSite: "None",
          maxAge: tokenDuration,
        })
        .json({
          message: "OTP verified successfully",
          newUser: false,
          user: userExists,
        });
    }

    // If the user does not exist, indicate that it's a new user
    res.status(200).json({
      message: "OTP verified successfully",
      newUser: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

