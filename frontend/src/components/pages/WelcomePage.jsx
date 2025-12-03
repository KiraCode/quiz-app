import React from "react";
import { LogOut, CheckCircle2, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "./footer";

const WelcomePage = () => {
  return (
    <div
      data-theme="fantasy"
      className="min-h-screen bg-base-200 flex flex-col items-center"
    >
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-md w-full px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-4xl font-extrabold text-primary">
          <span>Q</span>uiz
        </h1>

        {/* Logout Button */}
        <Link to="/logout" className="btn btn-primary flex items-center gap-2">
          <LogOut className="w-4 h-4" />
          Logout
        </Link>
      </div>

      <div className="w-full border-t-4 border-white"></div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-0">
        <div className="card bg-base-100 shadow-2xl rounded-box w-full max-w-md p-8 mt-16 animate-fade-in">
          <div className="flex flex-col items-center text-center">
            {/* Icon */}
            <HelpCircle size={80} className="text-info mb-4" />

            {/* Title */}
            <p className="text-3xl font-bold text-base-content mb-2">
              Are you ready?
            </p>

            {/* Subtitle */}
            <p className="text-base text-base-content mb-6 opacity-70">
              Let's see how many questions you can answer.
            </p>

            {/* Checklist */}
            <ul className="space-y-2 text-left mb-6 w-full max-w-xs">
              <li className="flex items-center text-base-content">
                <CheckCircle2 className="text-success mr-2" />
                There are 10 questions
              </li>
              <li className="flex items-center text-base-content">
                <CheckCircle2 className="text-success mr-2" />
                You need to pick 1 answer for each
              </li>
            </ul>

            {/* Start Quiz */}
            <Link
              to="/questions"
              className="btn btn-primary w-full text-lg font-semibold"
            >
              Start the Quiz
            </Link>
          </div>
        </div>
      </div>

      <Footer />

      {/* Minimal fade-in animation */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;
