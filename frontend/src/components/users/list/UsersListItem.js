import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  blockUsersAction,
  unBlockUsersAction,
} from "../../../redux/slices/users/usersSlices";

const UsersListItem = (user) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // send email
  const sendMailNavigate = () => {
    navigate("/send-email", {
      state: { email: user?.user?.email, id: user?.user?._id },
    });
  };

  return (
    <>
      <div className="p-8 mb-4 bg-gray-200 shadow rounded">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-3/12 flex px-4 mb-6 lg:mb-0">
            <img
              className="w-10 h-10 mr-4 object-cover rounded-full"
              src={user?.user?.profilePhoto}
              alt="profile "
            />
            <div>
              <p className="text-sm font-medium">
                {user?.user?.firstName} {user?.user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.user?.email}</p>
            </div>
          </div>
          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
            <p className="py-1 px-2 text-xs text-gray-800 bg-gray-300 rounded-full">
              {user?.user?.accountType}
              <span>{user?.user?.isBlocked && "Blocked"}</span>
            </p>
          </div>
          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
            <p className="text-sm font-medium">
              <span className="text-base mr-2  text-bold text-yellow-500">
                {user.user?.followers?.length}
              </span>
              followers
            </p>
          </div>
          <div className="w-full flex lg:w-4/12 px-4  mb-6 lg:mb-0">
            <p className="inline-block py-1 px-2 mr-2 mb-1 lg:mb-0 text-sm font-medium border-2 rounded">
              <span className="text-base mr-2  boder-2 text-bold text-yellow-500">
                {user?.user?.posts?.length}
              </span>
              Posts
            </p>
            <Link
              to={`/profile/${user?.user?._id}`}
              className="inline-block py-1 px-2 text-center bg-green-700 mr-2 mb-1 lg:mb-0 text-sm font-medium border border-gray-900 rounded hover:bg-green-600 hover:text-white"
            >
              Profile
            </Link>

            {user?.user?.isBlocked ? (
              <button
                onClick={() => dispatch(unBlockUsersAction(user?.user?._id))}
                className="inline-block py-1 px-2 text-center bg-gray-500 mr-2 mb-1 lg:mb-0 text-sm font-medium border border-gray-900 rounded hover:bg-green-600 hover:text-white"
              >
                unblock
              </button>
            ) : (
              <button
                onClick={() => dispatch(blockUsersAction(user?.user?._id))}
                className="inline-block py-1 px-2 text-center bg-red-600 mr-2 mb-1 lg:mb-0 text-sm font-medium border border-gray-900 rounded hover:bg-green-600 hover:text-white"
              >
                Block
              </button>
            )}

            <button
              onClick={sendMailNavigate}
              
              className="inline-flex  justify-center bg-green-700 px-2   border border-gray-900 shadow-sm text-sm font-medium rounded-md text-gray-700  hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <AiOutlineMail
                className="-ml-1 mr-2 h-5 w-5 text-gray-200"
                aria-hidden="true"
              />
              <span className="text-base mr-2  text-bold text-gray-900 hover:text-white"
              >
                Message
              </span>
            </button>
          </div>
          <div className="w-full lg:w-1/12 px-4">
            <div className="flex items-center">
              {/* Send Mail */}
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersListItem;
