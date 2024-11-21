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
        cost: {
          gte: minCost ? parseInt(minCost) : undefined,
          lte: maxCost ? parseInt(maxCost) : undefined,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
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
    const post = await prisma.post.findUnique({
      where: {
        postId: paramPostId,
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
        if (!err) {
          const saved = await prisma.savedPosts.findUnique({
            where: {
              id_postId: {
                postId: paramPostId,
                id: user.id,
              },
            },
          });
          return res
            .status(200)
            .json({ ...post, isSaved: saved ? true : false });
        }
      });
    } else {
      return res.status(200).json({ ...post, isSaved: false });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to get Post" });
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
