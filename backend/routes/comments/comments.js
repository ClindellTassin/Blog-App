const express = require("express");
const {
  createComment,
  fetchComments,
  fetchComment,
  updateComment,
  deleteComment,
} = require("../../controllers/comments/comments");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const commentRoutes = express.Router();

commentRoutes.post("/", authMiddleware, createComment);
commentRoutes.get("/", fetchComments);
commentRoutes.get("/:id", authMiddleware, fetchComment);
commentRoutes.put("/:id", authMiddleware, updateComment);
commentRoutes.delete("/:id", authMiddleware, deleteComment);

module.exports = commentRoutes;
