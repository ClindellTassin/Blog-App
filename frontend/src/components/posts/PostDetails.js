import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MdSystemUpdateAlt } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostAction,
  fetchPostDetailsAction,
} from "../../redux/slices/posts/postSlices";
import DateFormatter from "../../utils/DateFormatter";
import LoadingComponent from "../../utils/LoadingComponent";
import AddComment from "../comments/AddComment";
import CommentsList from "../comments/CommentsList";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const post = useSelector((state) => state?.post);
  const { postDetails, loading, appErr, serverErr, isDeleted } = post;

  // comment
  const comment = useSelector((state) => state?.comment);
  const { commentCreated, commentDeleted } = comment;

  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [id, dispatch, commentCreated, commentDeleted]);

  // get login user
  const user = useSelector((state) => state.users);
  const { userAuth } = user;
  const isCreatedBy = postDetails?.user?._id === userAuth?._id;

  if (isDeleted) navigate("/posts");

  return (
    <>
      {loading ? (
        <div className="h-screen">
          <LoadingComponent />
        </div>
      ) : appErr || serverErr ? (
        <h1 className="h-screen text-red-300 text-xl">
          {serverErr} - {appErr}
        </h1>
      ) : (
        <section className="py-20 2xl:py-40 bg-gray-800 overflow-hidden">
          <div className="container px-4 mx-auto">
            {/* Post Image */}
            <img
              className="mb-24 w-full h-96 object-cover"
              src={postDetails?.image}
              alt=""
            />
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
                {postDetails?.title}
              </h2>

              {/* User */}
              <div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
                <img
                  className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                  src={postDetails?.user?.profilePhoto}
                  alt=""
                />
                <div className="text-left">
                  <Link to={`/profile/${postDetails?.user?._id}`}>
                    <h4 className="mb-1 text-2xl font-bold text-gray-50">
                      <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
                        {postDetails?.user?.firstName}{" "}
                        {postDetails?.user?.lastName}
                      </span>
                    </h4>
                  </Link>
                  <p className="text-gray-500">
                    <DateFormatter date={post?.createdAt} />
                  </p>
                </div>
              </div>
              {/* Post description */}
              <div className="max-w-xl mx-auto">
                <p className="mb-6 text-left  text-xl text-gray-200">
                  {postDetails?.description}

                  {/* Show delete and update btn if it was created by the user */}
                  {isCreatedBy ? (
                    <p className="flex">
                      <Link
                        to={`/update-post/${postDetails?._id}`}
                        className="p-3"
                      >
                        <MdSystemUpdateAlt className="h-8 mt-3 text-yellow-300" />
                      </Link>
                      <button
                        onClick={() =>
                          dispatch(deletePostAction(postDetails?._id))
                        }
                        className="ml-3"
                      >
                        <RiDeleteBin6Line className="h-8 mt-3 text-red-600" />
                      </button>
                    </p>
                  ) : null}
                </p>
              </div>
            </div>
          </div>
          {/* Add comment Form component here */}
          {userAuth ? <AddComment postId={id} /> : null}
          <div className="flex justify-center  items-center">
            <CommentsList comments={postDetails?.comments} postId={post?._id} />
          </div>
        </section>
      )}
    </>
  );
};

export default PostDetails;
