import { Link } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";

export default function QuizAuth() {
  return (
    <div
      data-theme="fantasy"
      className="min-h-screen flex items-center justify-center bg-base-200 px-4"
    >
      <div className="card w-full max-w-md bg-base-100 shadow-2xl rounded-2xl animate-fade-in">
        <div className="card-body items-center text-center">
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-primary mb-2">
            Welcome to Quiz App 🎉
          </h1>

          <p className="text-base-content opacity-80 mb-8 text-sm sm:text-base">
            Test your knowledge and compete with yourself. Are you ready?
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-4 w-full">
            {/* Login */}
            <Link
              to="/login"
              className="btn btn-primary w-full flex items-center justify-center gap-2 text-lg"
            >
              <LogIn className="w-5 h-5" />
              Log In
            </Link>

            <span className="text-sm text-gray-400">OR</span>

            {/* Signup */}
            <Link
              to="/signup"
              className="btn btn-secondary w-full flex items-center justify-center gap-2 text-lg"
            >
              <UserPlus className="w-5 h-5" />
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Fade-in Animation */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
