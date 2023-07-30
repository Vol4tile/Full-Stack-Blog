import express from "express";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import { upload } from "../utils/saveImages.js";
import { tokenControl } from "../utils/tokenControl.js";
import {
  createPostSchema,
  offsetsSchema,
  selectedPostSchema,
} from "../JoiModels/CreateSchema.js";
const router = express.Router();
router.post("/createPost", tokenControl, async (req, res) => {
  try {
    const { error, value } = createPostSchema.validate(req.body);

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    const { baslik, yazi } = value;

    const user = await User.findOne({ username: req.user });

    if (user) {
      const createPost = await Post.create({
        baslik,
        yazi,
        postedBy: user,
      });
      res.status(200).json(createPost);
    } else {
      res.status(400);
    }
  } catch (err) {
    return res.sendStatus(404);
  }
});

router.get("/LatestPosts", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort([["createDate", -1]])
      .limit(3)
      .populate("postedBy", "username _id profilePhoto fullname");

    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(201);
    }
  } catch (err) {
   
    res.status(404);
  }
});

router.get("/selectedPost/:postId", async (req, res) => {
  try {
    const { error, value } = selectedPostSchema.validate(req.params);
    if (error) {
      return res.status(500).json({ message: error.message });
    }

    const post = await Post.findOne({ _id: value.postId }).populate(
      "postedBy",
      "username _id profilePhoto fullname"
    );

    if (post) {
      return res.status(200).json(post);
    } else {
      res.status(201);
    }
  } catch (err) {
   
    res.status(404);
  }
});
router.post("/uploadImage", [upload.single("file")], async (req, res) => {
  try {
    const path = req.file.filename;

    res.status(200).json(path);
  } catch (err) {
   
  }
});

router.get("/posts/:offset", async (req, res) => {
  try {
    const { error, value } = offsetsSchema.validate(req.params);
    if (error) {
     
      return res.status(500).json({ message: error.message });
    }
  
    const { offset } = value;
    const limit = 10;

    const posts = await Post.find()
      .sort({ createDate: -1 })
      .skip(offset)
      .limit(limit)
      .populate("postedBy", "username _id profilePhoto fullname");

    res.status(200).json(posts);
  } catch (error) {
  
    res.status(500).json({ error: " error" });
  }
});
router.get("/myPosts/:offset", tokenControl, async (req, res) => {
  try {
    const { error, value } = offsetsSchema.validate(req.params);
    if (error) {
     
      return res.status(500).json({ message: error.message });
    }
   
    const { offset } = value;

    const limit = 10;
    const username = req.user;
   
    const user = await User.findOne({ username });
    const posts = await Post.find({ postedBy: user._id })
      .sort({ createDate: -1 })
      .skip(offset)
      .limit(limit)
      .populate("postedBy", "username _id profilePhoto fullname");

    res.status(200).json(posts);
  } catch (error) {
   
    res.status(500).json({ error: " error" });
  }
});
export default router;
