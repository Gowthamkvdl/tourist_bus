import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const {
    location,
    busType,
    recliningSeats,
    ac,
    wifi,
    tv,
    usb,
    minCost,
    maxCost,
    price,
    seats,
  } = req.query;

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const currentDateString = currentDate.toISOString();

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: location
          ? { contains: location, mode: "insensitive" }
          : undefined,
        busType: busType ? { equals: busType } : undefined,
        recliningSeats: recliningSeats ? recliningSeats === "true" : undefined,
        ac: ac ? ac === "true" : undefined,
        wifi: wifi ? wifi === "true" : undefined,
        tv: tv ? tv === "true" : undefined,
        usb: usb ? usb === "true" : undefined,
      },
      orderBy: [
        {numberOfSeats : seats ? (seats === "HTL" ? "desc" : "asc") : undefined},
        {cost: price ? (price === "HTL" ? "desc" : "asc") : undefined},
      ],
      include: {
        user: {
          select: {
            name: true,
            phone: true, // Assuming the `User` model contains these fields
          },
        },
        savedPosts: true, // Include saved posts for future processing
      },
      take: limit,
    });

    // Optionally format the data (e.g., compute a total count or enrich posts)
    res.status(200).json({ postData: posts, total: posts.length });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const paramPostId = req.params.id;

  try {
    // Fetch the post and include user and reviews
    const post = await prisma.post.findUnique({
      where: {
        postId: paramPostId,
      },
      include: {
        user: true,
        reviews: true, // Assuming reviews are related in the schema
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const token = req.cookies?.token;

    // Default response data
    let isSaved = false;

    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const saved = await prisma.savedPosts.findUnique({
          where: {
            userId_postId: {
              postId: paramPostId,
              userId: user.id,
            },
          },
        });
        isSaved = !!saved; // Boolean value
      } catch (err) {
        console.error("Token verification failed:", err.message);
        return res.status(401).json({ message: "Invalid or expired token" });
      }
    }

    // Return post data with isSaved and reviews
    return res.status(200).json({ ...post, isSaved });
  } catch (error) {
    console.error("Error fetching post:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch post", error: error.message });
  }
};

export const addPost = async (req, res) => {
  const tokenUserId = req.userId;
  const postData = req.body;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...postData,
        userId: tokenUserId,
      },
    });

    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to Add Post" });
  }
};

export const updatePost = async (req, res) => {
  const tokenUserId = req.userId;
  const paramPostId = req.params.id;
  const { ...newPostData } = req.body;

  try {
    const post = await prisma.post.findUnique({
      where: {
        postId: paramPostId,
      },
    });

    if (post.userId !== tokenUserId) {
      res.status(403).json({ message: "Not Authorized!" });
    }

    const updatedPost = await prisma.post.update({
      where: {
        postId: paramPostId,
      },
      data: {
        ...newPostData,
      },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to Update Post" });
  }
};

export const deletePost = async (req, res) => {
  const tokenUserId = req.userId;
  const postId = req.params.id;
  console.log(postId);

  try {
    const post = await prisma.post.findUnique({
      where: {
        postId,
      },
    });
    console.log(post);

    if (post.userId !== tokenUserId) {
      res.status(403).json({ message: "Not Authorized!" });
    }

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

export const addPostRating = async (req, res) => {
  const tokenUserId = req.userId;
  const { post, starCount } = req.body;

  try {
    // Check if a rating from this user to the profile already exists
    const existingRating = await prisma.starRating.findFirst({
      where: {
        giverId: tokenUserId,
        postId: post.postId,
      },
    });

    if (existingRating) {
      // Update the existing rating
      await prisma.starRating.update({
        where: {
          starRatingId: existingRating.starRatingId,
        },
        data: {
          starCount,
        },
      });
    } else {
      // Create a new rating
      await prisma.starRating.create({
        data: {
          giverId: tokenUserId,
          postId: post.postId,
          starCount,
        },
      });
    }

    // Fetch all ratings for the profile to recalculate total and average ratings
    const ratings = await prisma.starRating.findMany({
      where: {
        postId: post.postId,
      },
      select: {
        starCount: true,
      },
    });

    const totalRatings = ratings.length;
    const averageRating =
      totalRatings > 0
        ? ratings.reduce((acc, rating) => acc + rating.starCount, 0) /
          totalRatings
        : 0;

    // Round the average rating to the nearest 0.5
    const roundedAverageRating = Math.round(averageRating * 2) / 2;

    // Update the user's totalRatings and averageRating
    await prisma.post.update({
      where: {
        postId: post.postId,
      },
      data: {
        totalRating: totalRatings,
        averageRating: roundedAverageRating,
      },
    });

    res.status(200).json({
      message: existingRating
        ? "Rating updated successfully"
        : "Rating added successfully",
      totalRatings,
      averageRating: roundedAverageRating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add or update rating" });
  }
};

export const savePost = async (req, res) => {
  const postId = req.body.postId;
  const tokenUserId = req.userId;

  console.log(postId, tokenUserId);

  // Check if postId and tokenUserId are defined
  if (!postId || !tokenUserId) {
    return res.status(400).json({ message: "Invalid postId or userId" });
  }

  try {
    const savedPost = await prisma.savedPosts.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId,
        },
      },
    });

    if (savedPost) {
      await prisma.savedPosts.delete({
        where: {
          userId_postId: {
            userId: tokenUserId,
            postId,
          },
        },
      });
      return res.status(200).json({ message: "Post Unsaved" });
    } else {
      await prisma.savedPosts.create({
        data: {
          userId: tokenUserId,
          postId,
        },
      });
      return res.status(201).json({ message: "Post Saved" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getSavedPosts = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const savedPosts = await prisma.savedPosts.findMany({
      where: {
        userId: tokenUserId,
      },
      include: {
        post: true,
      },
    });
    res.status(200).json(savedPosts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const profilePosts = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const profilePosts = await prisma.post.findMany({
      where: { userId: tokenUserId },
    });
    res.status(200).json(profilePosts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
