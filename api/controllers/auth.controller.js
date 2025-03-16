import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  try {
    
    // Get and trim values from req.body
    let { name, phone, city } = req.body;

    name = name?.trim();
    city = city?.trim().toLowerCase();
    phone = phone?.trim();

    // Validate required fields
    if (!name || !phone ||  !city ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let newUser;

    newUser = await prisma.user.create({
      data: {
        name,
        phone,
        city,
      },
    });

    if (newUser) {
      // Token expiration time (1 week)
      const tokenDuration = 1000 * 60 * 60 * 24 * 7;

      const token = jwt.sign(
        {
          id: newUser.id,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: tokenDuration,
        }
      );

      return res
        .cookie("token", token, {
          httpOnly: false, // This should be true in production
          secure: true,
          sameSite: "None",
          maxAge: tokenDuration,
        })
        .json({
          message: "Registration successful",
          newUser: true,
          user: newUser,
        });
    } else {
      throw new Error("User creation failed");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: `Failed to create user: ${error.message}` });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const tokenUserId = req.userId;
  const { ...inputs } = req.body;

  console.log(userId, tokenUserId)

  // if (userId !== tokenUserId) {
  //   return res.status(403).json({ message: "Not Authorized!" });
  // }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...inputs,
      },
    });

    res.status(200).json({
      updatedUser: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update User!" });
  }
};

export const deleteUser = async (req, res) => {
  const tokenUserId = req.userId;
  const userId = req.params.id;
  console.log(userId);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id:userId,
      },
    });
    console.log(user);

    if (user.id !== tokenUserId) {
      res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    res.status(200).json({ message: "User Deleted!" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to Delete User" });
  }
}