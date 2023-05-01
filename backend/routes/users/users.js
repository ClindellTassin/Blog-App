const express = require("express");
const {
  userRegister,
  userLogin,
  fetchUsers,
  deleteUser,
  fetchUser,
  userProfile,
  updateUser,
  updateUserPassword,
  followingUser,
  unfollowUser,
  blockUser,
  unBlockUser,
  generateVerificationToken,
  accountVerification,
  forgetPasswordToken,
  passwordReset,
  profilePhotoUpload
} = require("../../controllers/users/users");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const {
  photoUpload,
  profilePhotoResize,
} = require("../../middlewares/upload/photoUpload");

const userRoutes = express.Router();

// authentication
userRoutes.post("/register", userRegister);
userRoutes.post("/login", userLogin);
userRoutes.get("/:id", fetchUser);
userRoutes.get("/", authMiddleware, fetchUsers);
userRoutes.delete("/:id", deleteUser);
userRoutes.get("/profile/:id", authMiddleware, userProfile);
userRoutes.put("/", authMiddleware, updateUser);
userRoutes.put("/password", authMiddleware, updateUserPassword);
userRoutes.post(
  "/generate-verifiy-email-token",
  authMiddleware,
  generateVerificationToken
);
userRoutes.put("/verify-account", authMiddleware, accountVerification);
userRoutes.post("/forget-password-token", forgetPasswordToken);
userRoutes.put("/reset-password", passwordReset);

// social
userRoutes.put("/follow", authMiddleware, followingUser);
userRoutes.put("/unfollow", authMiddleware, unfollowUser);
userRoutes.put("/block-user/:id", authMiddleware, blockUser);
userRoutes.put("/unblock-user/:id", authMiddleware, unBlockUser);

// photo upload
userRoutes.put(
  "/profilephoto-upload",
  authMiddleware,
  photoUpload.single("image"),
  profilePhotoResize,
  profilePhotoUpload
);

module.exports = userRoutes;
