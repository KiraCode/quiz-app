import React, { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import useAuthState from "../../hooks/useAuthState";
import { useDispatch } from "react-redux";
import { loginAPI } from "../../store/thunk/authThunk.js";
import { routes } from "../../App";

const Login = () => {
  const { isAuthenticated, loading, error, email } = useAuthState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.protectedRoutes.welcome);
    }
  }, [isAuthenticated, navigate]);

  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      email: Yup.string()
        .trim()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().trim().required("Password is required"),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      email: email || "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(loginAPI(values));

        if (loginAPI.fulfilled.match(resultAction)) {
          toast.success("Login Successful");
        } else {
          toast.error(resultAction.payload || "Login failed");
        }
      } catch (error) {
        console.error("login error:", error);
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <div
      data-theme="fantasy"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-base-200 p-6"
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <h1 className="text-5xl font-extrabold text-center mb-8 text-primary drop-shadow">
          <span className="text-primary">Q</span>uiz
        </h1>

        {/* Card */}
        <div className="card bg-base-100 shadow-xl rounded-2xl p-8 border border-base-300">
          <h2 className="text-3xl font-bold text-center mb-6 text-primary">
            Welcome Back
          </h2>

          {/* Form */}
          <form className="w-full space-y-4" onSubmit={formik.handleSubmit}>
            {Boolean(error) && (
              <p className="text-error text-center font-medium">{error}</p>
            )}

            {/* Email Input */}
            <div>
              <input
                name="email"
                type="email"
                className={`input input-bordered w-full ${
                  formik.errors.email && formik.touched.email
                    ? "input-error"
                    : ""
                }`}
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-error text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <input
                name="password"
                type="password"
                className={`input input-bordered w-full ${
                  formik.errors.password && formik.touched.password
                    ? "input-error"
                    : ""
                }`}
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-error text-sm mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-4 text-lg tracking-wide"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Extra Links */}
          <div className="text-center mt-6">
            <p className="text-sm text-base-content/70">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary font-semibold hover:underline transition"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
