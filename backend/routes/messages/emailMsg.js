const express = require("express");
const { sendEmailMsg } = require("../../controllers/messages/emailMsg");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const emailRoutes = express.Router();

emailRoutes.post("/", authMiddleware, sendEmailMsg);

module.exports = emailRoutes;
