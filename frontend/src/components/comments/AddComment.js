import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction } from "../../redux/slices/comments/commentSlices";
import LoadingComponent from "../../utils/LoadingComponent";

//Form schema
const formSchema = Yup.object({
  description: Yup.string().required("Comment is required"),
});

const AddComment = ({ postId }) => {
  const dispatch = useDispatch();

  const comment = useSelector((state) => state?.comment);
  const { loading, appErr, serverErr } = comment;

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    onSubmit: (values) => {
      const data = {
        postId,
        description: values?.description,
      };
      dispatch(createCommentAction(data));
    },
    validationSchema: formSchema,
  });

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Error Message */}
      {serverErr || appErr ? (
        <h2 className="text-green-400 pb-2">
          {serverErr} - {appErr}
        </h2>
      ) : null}
      <form
        onSubmit={formik.handleSubmit}
        className="mt-1 flex max-w-sm m-auto"
      >
        <input
          onBlur={formik.handleBlur("description")}
          value={formik.values.description}
          onChange={formik.handleChange("description")}
          type="text"
          name="text"
          id="text"
          className="shadow-sm focus:ring-green-700  mr-2 focus:border-green-700 block w-full p-2 border-1 sm:text-sm border-gray-300 rounded-md"
          placeholder="Add New comment"
        />

        {loading ? (
          <button
            disabled
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-gray-600"
          >
            <LoadingComponent />
          </button>
        ) : (
          <button
            type="submit"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-700 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
          >
            Submit
          </button>
        )}
      </form>
      <div className="text-green-400 mb-2 mt-2">
        {formik.touched.description && formik.errors.description}
      </div>
    </div>
  );
};

export default AddComment;
