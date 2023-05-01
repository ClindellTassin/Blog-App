const express = require("express");
const {
  createPost,
  fetchPosts,
  fetchPost,
  updatePost,
  deletePost,
  toggleAddLikeToPost,
  toggleAddDislikeToPost,
} = require("../../controllers/posts/posts");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const {
  photoUpload,
  postImgResize,
} = require("../../middlewares/upload/photoUpload");

const postRoutes = express.Router();

// posts
postRoutes.post(
  "/",
  authMiddleware,
  photoUpload.single("image"),
  postImgResize,
  createPost
);
postRoutes.get("/", fetchPosts);
postRoutes.get("/:id", fetchPost);
postRoutes.put("/:id", authMiddleware, updatePost);
postRoutes.delete("/:id", authMiddleware, deletePost);

// likes
postRoutes.put("/likes", authMiddleware, toggleAddLikeToPost);
postRoutes.put("/dislikes", authMiddleware, toggleAddDislikeToPost);

module.exports = postRoutes;
