import prisma from "../lib/prisma.js";

export const verifyBus = async (req, res) => {
  const tokenUserId = req.userId;
  const postId = req.params.id;
  const verificationStatus = req.body.verificationStatus;
  const remark = req.body.remark;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: tokenUserId,
      },
    });

    if (!user.admin) {
      res.status(403).json({ message: "Not Authorized!" });
    }

    const updatedPost = await prisma.post.update({
      where: { postId },
      data: {
        verificationStatus,
        remark,
      },
    });

    console.log("verification status updated successfully");
    return res.status(200).json({
      message: "Verification status updated successfully.",
      updatedPost,
    });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: "Failed to change verification status of the Post" });
  }
};

export const banUser = async (req, res) => {
  const tokenUserId = req.userId;
  const userId = req.params.id;
  const banStatus = req.body.banStatus;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: tokenUserId,
      },
    });

    if (!user.admin) {
      res.status(403).json({ message: "Not Authorized!" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        isBanned: banStatus,
      },
    });

    console.log("ban status updated successfully");
    return res.status(200).json({
      message: "ban status updated successfully.",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: "Failed to change ban status of the user" });
  }
};

export const makeAdmin = async (req, res) => {
  const tokenUserId = req.userId;
  const userId = req.params.id;
  const adminStatus = req.body.adminStatus;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: tokenUserId,
      },
    });

    if (!user.admin) {
      res.status(403).json({ message: "Not Authorized!" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        admin: adminStatus,
      },
    });

    console.log("Admin status updated successfully");
    return res.status(200).json({
      message: "Admin status updated successfully.",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: "Failed to change admin status of the user" });
  }
};

export const deleteBus = async (req, res) => {
  const tokenUserId = req.userId;
  const postId = req.params.id;
  console.log(tokenUserId);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: tokenUserId,
      },
    });

    if (!user.admin) {
      res.status(403).json({ message: "Not Authorized!" });
    }

    const post = await prisma.post.findUnique({
      where: {
        postId,
      },
    });
    console.log(post);

    await prisma.post.delete({
      where: {
        postId,
      },
    });

    res.status(200).json({ message: "Post Deleted!" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to Delete Post" });
  }
};
export const disableBus = async (req, res) => {
  const tokenUserId = req.userId;
  const postId = req.params.id;
  const status = req.body.status;
  console.log(tokenUserId);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: tokenUserId,
      },
    });

    if (!user.admin) {
      res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.post.update({
      where: {
        postId,
      },
      data: {
        disabled:status
      },
    });

    res.status(200).json({ message: "Post Deleted!" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to Delete Post" });
  }
};
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        Post: true,
        name: true,
        id: true,
        city: true,
        phone: true,
        isBanned: true,
        admin: true,
        createdAt: true,
        savedPosts: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to get users" });
  }
};
