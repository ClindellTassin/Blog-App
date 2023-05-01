import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import categoriesReducer from "../slices/category/categorySlice";
import post from "../slices/posts/postSlices";
import comment from "../slices/comments/commentSlices";
import sendMail from "../slices/email/emailSlices";
import verification from "../slices/verification/verificationSlices";

const store = configureStore({
  reducer: {
    users: usersReducer,
    category: categoriesReducer,
    post,
    comment,
    sendMail,
    verification,
  },
});

export default store;
