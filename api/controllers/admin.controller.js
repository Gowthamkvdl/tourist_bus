import prisma  from "../lib/prisma.js";

// GET /admin/users — fetch all users with their post count
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        Post: {                          // ← full Post array, not _count
          select: {
            postId: true,
            verificationStatus: true,
          },
        },
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /admin/posts — all posts with owner info (for AdminBuses + AdminVerify + AdminHome)
export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { id: true, name: true, phone: true, city: true, isBanned: true },
        },
      },
    });
    res.status(200).json({ postData: posts, total: posts.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /admin/posts/:postId/verify — accept or reject a bus
export const verifyPost = async (req, res) => {
  const { postId } = req.params;
  const { status } = req.body; // "accepted" | "rejected" | "pending"

  if (!["accepted", "rejected", "pending"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const updated = await prisma.post.update({
      where: { postId },
      data: { verificationStatus: status },
    });
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /admin/posts/:postId/disable — toggle disable/enable a bus
export const toggleDisablePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await prisma.post.findUnique({ where: { postId } });
    if (!post) return res.status(404).json({ message: "Post not found" });

    const updated = await prisma.post.update({
      where: { postId },
      data: { disabled: !post.disabled },
    });
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /admin/users/:userId/ban — toggle ban/unban a user
export const toggleBanUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { isBanned: !user.isBanned },
    });
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /admin/posts/:postId — hard delete a post
export const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    await prisma.post.delete({ where: { postId } });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /admin/users/:userId — hard delete a user + their posts
export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await prisma.user.delete({ where: { id: userId } }); // cascades to Post
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};