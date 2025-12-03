import React, { useEffect, useState } from "react";
import { logoutUser } from "../../store/thunk/authThunk.js";
import { useDispatch } from "react-redux";
import useAuthState from "../../hooks/useAuthState";
import { useNavigate } from "react-router-dom";
import { routes } from "../../App";

const Logout = () => {
  const { isAuthenticated } = useAuthState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(logoutUser(false));
    }

    // Countdown timer
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Navigate after 5 seconds
    const timeout = setTimeout(() => {
      navigate(routes.login, { replace: true });
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isAuthenticated, dispatch, navigate]);

  return (
    <div
      data-theme="fantasy"
      className="min-h-screen flex items-center justify-center bg-base-200 p-6"
    >
      <div className="card bg-base-100 shadow-xl p-8 w-full max-w-md text-center animate-fadeIn rounded-xl">
        <h1 className="text-3xl font-bold text-primary mb-4">Logging Out...</h1>
        <p className="text-base-content/80 mb-6">
          You will be redirected to the login page in{" "}
          <span className="font-semibold text-primary">{countdown}</span>{" "}
          seconds.
        </p>

        {/* Progress Bar */}
        <progress
          className="progress progress-primary w-full"
          value={(5 - countdown) * 20}
          max="100"
        ></progress>

        <p className="text-sm mt-4 text-base-content/60">
          Thank you for using Quiz App
        </p>
      </div>
    </div>
  );
};

export default Logout;
