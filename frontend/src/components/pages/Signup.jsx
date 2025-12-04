import React, { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signupAPI } from "../../store/thunk/authThunk.js";
import toast from "react-hot-toast";
import useAuthState from "../../hooks/useAuthState";
import { routes } from "../../App";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, email } = useAuthState();

  /** ✅ FIX: useEffect had no dependency array => re-render loop */
  useEffect(() => {
    if (email) {
      navigate(routes.login);
    } else if (isAuthenticated) {
      navigate(routes.protectedRoutes.welcome);
    }
  }, [email, isAuthenticated, navigate]);

  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      username: Yup.string().trim().required("User name is required"),
      email: Yup.string()
        .trim()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string().trim().required("Password is required"),
      confirmPassword: Yup.string()
        .trim()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const resultAction = await dispatch(signupAPI(values));

      if (signupAPI.fulfilled.match(resultAction)) {
        toast.success("Signup Successful");
        navigate(routes.login);
      } else {
        toast.error(resultAction.payload || "Signup failed");
      }
    },
  });

  return (
    <div
      data-theme="fantasy"
      className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4"
    >
      {/* Logo */}
      <h1 className="text-5xl sm:text-6xl font-extrabold mb-8 text-primary">
        <span className="text-primary">Q</span>uiz
      </h1>

      {/* Card */}
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8 border border-base-300">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">
          Create an Account
        </h2>

        {/* Form */}
        <form className="w-full space-y-4" onSubmit={formik.handleSubmit}>
          {/* Username */}
          <div className="form-control">
            <input
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              placeholder="Username"
              className={`input input-bordered w-full ${
                formik.touched.username && formik.errors.username
                  ? "input-error"
                  : ""
              }`}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.username}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="form-control">
            <input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              placeholder="Email Address"
              className={`input input-bordered w-full ${
                formik.touched.email && formik.errors.email ? "input-error" : ""
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <input
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              placeholder="Password"
              className={`input input-bordered w-full ${
                formik.touched.password && formik.errors.password
                  ? "input-error"
                  : ""
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-control">
            <input
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              placeholder="Confirm Password"
              className={`input input-bordered w-full ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "input-error"
                  : ""
              }`}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-2 tracking-wide"
          >
            Sign Up
          </button>
        </form>

        {/* Redirect */}
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
