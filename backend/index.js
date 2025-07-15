import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

const prisma = new PrismaClient();
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
const secretKey = process.env.JWT_SECRET_KEY;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password, // In a real application, hash this password!
      },
    });
    res
      .status(201)
      .json({ message: "User created successfully", success: true, user });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "User registration failed",
      details: error.message,
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // In a real application, compare hashed passwords
    if (user.password !== password) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }


    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Login failed", details: error.message });
  }
});

app.post("/posts", async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        userId,
      },
    });
    res
      .status(201)
      .json({ message: "Post created successfully", success: true, post });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Post creation failed",
      details: error.message,
    });
  }
});

app.put("/updateposts/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
      },
    });
    res
      .status(200)
      .json({ message: "Post updated successfully", success: true, post });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Post update failed",
      details: error.message,
    });
  }
});

app.delete("/deleteposts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.post.delete({
      where: { id },
    });
    res
      .status(200)
      .json({ message: "Post deleted successfully", success: true });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Post deletion failed",
      details: error.message,
    });
  }
});

app.get("/allPost", async (req, res) => {

  try {
    const posts = await prisma.post.findMany({
      where: {
        userId,
      },
    });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to retrieve posts",
      details: error.message,
    });
  }
});

app.get("/singlePost/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId, // Assuming 'id' is the unique identifier for your posts
      },
    });

    if (!post) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }

    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to retrieve post",
      details: error.message,
    });
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
