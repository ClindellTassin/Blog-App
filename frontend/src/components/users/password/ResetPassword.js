import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLock } from "react-icons/ai";
import { passwordResetAction } from "../../../redux/slices/users/usersSlices";
import LoadingComponent from "../../../utils/LoadingComponent";

//Form schema
const formSchema = Yup.object({
  password: Yup.string().required("Password is required"),
});

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: (values) => {
      //dispath the action
      const data = {
        password: values?.password,
        token,
      };
      dispatch(passwordResetAction(data));
    },
    validationSchema: formSchema,
  });

  //select data from store
  const users = useSelector((state) => state?.users);
  const { passwordReset, loading, appErr, serverErr } = users;

  useEffect(() => {
    setTimeout(() => {
      if (passwordReset) navigate("/login");
    }, 5000);
  }, [passwordReset, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-yellow-500">
          Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-yellow-500">
            <Link
              to="/reset-password"
              className="font-medium text-yellow-500 hover:text-yellow-400"
            >
              Reset your password below
            </Link>
          </p>
        </div>
        {/* Err msg */}
        <div className="text-green-500 text-center">
          {appErr || serverErr ? (
            <h3>
              {serverErr} {appErr}
            </h3>
          ) : null}
        </div>

        {/* Sucess msg */}
        <div className="text-green-700 text-center">
          {passwordReset && (
            <h3>
              Password Reset Successfully. You must log back in with new password
            </h3>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Enter Your New Password
              </label>
              <input
                type="password"
                autoComplete="password"
                value={formik.values.password}
                onChange={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Enter new Password"
              />
              {/* Err msg */}
              <div className="text-green-400 mb-2">
                {formik.touched.password && formik.errors.password}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between"></div>

          <div>
            {loading ? (
              <LoadingComponent />
            ) : (
              <Link to="/login">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <AiOutlineLock
                    className="h-5 w-5 text-yellow-500 group-hover:text-yellow-400"
                    aria-hidden="true"
                  />
                </span>
                Reset Password
              </button>
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
