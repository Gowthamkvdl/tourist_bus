import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {};

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
              serverId_postId: {
                postId: paramPostId,
                serverId: user.id,
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
        caterId: tokenUserId,
      },
    });

    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Failed to Add Post" });
  }
};

export const updatePost = (req, res) => {};

export const deletePost = (req, res) => {};
