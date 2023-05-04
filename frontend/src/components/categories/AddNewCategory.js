import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCategoryAction } from "../../redux/slices/category/categorySlice";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../utils/LoadingComponent";
import Roomie from "../../img/poster1.png"

const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
});

const AddNewCategory = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      dispatch(createCategoryAction(values));
    },
    validationSchema: formSchema,
  });

  const state = useSelector((state) => state?.category);
  const { loading, appErr, serverErr, isCreated } = state;

  const navigate = useNavigate();
  if (isCreated) navigate("/category-list");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          {/* <BiBookOpen className="mx-auto h-12 w-auto" /> */}
          <img src={Roomie} alt="logo" className="mx-auto h-22 w-22 w-auto bg-transparent" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-yellow-500">
            Add New Category
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-yellow-500 hover:text-yellow-300">
              These are the categories user will select from when creating a post
            </p>
            {/* Display Error */}
            <div>
              {appErr || serverErr ? (
                <h2 className="text-green-700 text-center text-lg">
                  {serverErr} - {appErr}
                </h2>
              ) : null}
            </div>
          </p>
        </div>
        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Name
              </label>
              {/* Title */}
              <input
                value={formik.values.title}
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                type="text"
                autoComplete="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-green-700 placeholder-gray-800 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-700 focus:border-green-500 text-center focus:z-10 sm:text-sm"
                placeholder="New Category"
              />
              <div className="text-green-700 mb-2">
                {formik.touched.title && formik.errors.title}
              </div>
            </div>
          </div>

          <div>
            <div>
              {/* Submit */}
              {loading ? (
                <button
                  disabled
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <IoIosAddCircleOutline
                      className="h-5 w-5 text-yellow-500 group-hover:text-yellow-300"
                      aria-hidden="true"
                    />
                  </span>
                  <LoadingComponent />
                </button>
              ) : (
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <IoIosAddCircleOutline
                      className="h-5 w-5 text-yellow-500 group-hover:text-yellow-400"
                      aria-hidden="true"
                    />
                  </span>
                  Add new Category
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCategory;
