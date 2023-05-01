import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddNewCategory from "./components/categories/AddNewCategory";
import CategoryList from "./components/categories/CategoryList";
import UpdateCategory from "./components/categories/UpdateCategory";
import UpdateComment from "./components/comments/UpdateComment";
import HomePage from "./components/home/HomePage";
import Navbar from "./components/navigation/Navbar";
import AdminRoutes from "./components/navigation/protected/AdminRoutes";
import ProtectedRoutes from "./components/navigation/protected/ProtectedRoutes";
import CreatePost from "./components/posts/CreatePost";
import PostDetails from "./components/posts/PostDetails";
import PostsList from "./components/posts/PostsList";
import UpdatePost from "./components/posts/UpdatePost";
import Login from "./components/users/login/Login";
import Profile from "./components/users/profile/Profile";
import UpdateProfileForm from "./components/users/profile/UpdateProfileForm";
import UploadProfilePhoto from "./components/users/profile/UploadProfilePhoto";
import Register from "./components/users/register/Register";
import SendEmail from "./components/users/email/SendEmail";
import AccountVerified from "./components/users/verification/AccountVerified";
import UsersList from "./components/users/list/UsersList";
import UpdatePassword from "./components/users/password/UpdatePassword";
import ResetPasswordForm from "./components/users/password/ResetPasswordForm";
import ResetPassword from "./components/users/password/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/update-category/:id"
          element={
            <AdminRoutes>
              <UpdateCategory />
            </AdminRoutes>
          }
        />
        <Route
          path="/add-category"
          element={
            <AdminRoutes>
              <AddNewCategory />
            </AdminRoutes>
          }
        />
        <Route
          path="/category-list"
          element={
            <AdminRoutes>
              <CategoryList />
            </AdminRoutes>
          }
        />
        <Route
          path="/create-post"
          element={
            <ProtectedRoutes>
              <CreatePost />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/update-post/:id"
          element={
            <ProtectedRoutes>
              <UpdatePost />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/update-comment/:id"
          element={
            <ProtectedRoutes>
              <UpdateComment />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/upload-profile-photo"
          element={
            <ProtectedRoutes>
              <UploadProfilePhoto />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/update-profile/:id"
          element={
            <ProtectedRoutes>
              <UpdateProfileForm />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/send-email"
          element={
            <AdminRoutes>
              <SendEmail />
            </AdminRoutes>
          }
        />
        <Route
          path="/verify-account/:token"
          element={
            <ProtectedRoutes>
              <AccountVerified />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/users"
          element={
            <AdminRoutes>
              <UsersList />
            </AdminRoutes>
          }
        />
        <Route
          path="/update-password"
          element={
            <ProtectedRoutes>
              <UpdatePassword />
            </ProtectedRoutes>
          }
        />
        <Route path="/password-reset-token" element={<ResetPasswordForm />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route exact path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
