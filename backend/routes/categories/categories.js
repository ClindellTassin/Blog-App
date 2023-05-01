const express = require("express");
const {
  createCategory,
  fetchCategories,
  fetchCategory,
  updateCategory,
  deleteCategory,
} = require("../../controllers/categories/categories");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const categoryRoutes = express.Router();

categoryRoutes.post("/", authMiddleware, createCategory);
categoryRoutes.get("/", fetchCategories);
categoryRoutes.get("/:id", fetchCategory);
categoryRoutes.put("/:id", authMiddleware, updateCategory);
categoryRoutes.delete("/:id", authMiddleware, deleteCategory);

module.exports = categoryRoutes;
