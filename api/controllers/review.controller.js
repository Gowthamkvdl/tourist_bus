import prisma from "../lib/prisma.js";

export const addReview = async (req, res) => {
  const { postId, review, userId, name } = req.body;

  console.log(postId, review, userId, name);

  try {
    const newReview = await prisma.reviews.create({
      data: {
        postId,
        review,
        userId,
        name,
      },
    });
    res.status(200).json(newReview)
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to add review" });
  }
};
