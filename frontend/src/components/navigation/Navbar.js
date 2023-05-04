import React from "react";
import AdminNavbar from "./admin/AdminNavbar";
import PrivateNavbar from "./private/PrivateNavbar";
import PublicNavbar from "./public/PublicNavbar";
import { useSelector } from "react-redux";
import AccountVerificationAlert from "./alerts/AccountVerificationAlert";
import AccountVerificationSuccess from "./alerts/AccountVerificationSuccess";
import LoadingComponent from "../../utils/LoadingComponent";

const Navbar = () => {
  const state = useSelector((state) => state.users);
  const { userAuth } = state;
  const isAdmin = userAuth?.isAdmin;

  const account = useSelector((state) => state?.verification);
  const { loading, appErr, serverErr, token } = account;

  return (
    <>
      {isAdmin ? (
        <AdminNavbar isLogin={userAuth} />
      ) : userAuth ? (
        <PrivateNavbar isLogin={userAuth} />
      ) : (
        <PublicNavbar />
      )}
      {/* verification alert */}
      {userAuth && !userAuth?.isVerified && <AccountVerificationAlert />}
      {/* verification success */}
      {loading && <h2 className="text-center"><LoadingComponent /></h2>}
      {token && <AccountVerificationSuccess />}
      {appErr || serverErr ? (
        <h2 className="text-center text-green-500">
          {appErr} - {serverErr}
        </h2>
      ) : null}
    </>
  );
};

export default Navbar;
