import React, { useCallback, useEffect, useMemo, useState } from "react";
import { LogOut, RotateCcw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchCompleteQuizApi,
  fetchAttemptsAPI,
} from "../../store/thunks/resultThunk";
import useResultState from "../../hooks/useResultState";
import { routes } from "../../App";
import Footer from "./footer";

const QuizResults = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displayCorrectAnswers, setDisplayCorrectAnswers] = useState(false);

  const {
    inCorrectAnswers,
    correctAnswers,
    attempts,
    noOfCorrectAswers,
    noOfInCorrectAnswers,
    totalQuestions,
    status,
    loading,
    error,
  } = useResultState();

  useEffect(() => {
    if (status && !noOfInCorrectAnswers) {
      setDisplayCorrectAnswers(true);
    }
  }, [noOfInCorrectAnswers, status]);

  useEffect(() => {
    dispatch(fetchCompleteQuizApi());
    dispatch(fetchAttemptsAPI());
  }, [dispatch]);

  const correctRate = useMemo(
    () =>
      totalQuestions > 0
        ? ((noOfCorrectAswers / totalQuestions) * 100).toFixed(0)
        : 0,
    [noOfCorrectAswers, totalQuestions]
  );

  const handleReset = useCallback(() => {
    navigate(routes.protectedRoutes.questions);
  }, [navigate]);

  const displayQuestions = useMemo(
    () => (displayCorrectAnswers ? correctAnswers : inCorrectAnswers),
    [displayCorrectAnswers, correctAnswers, inCorrectAnswers]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-primary loading-xl"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="toast toast-center toast-middle">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      data-theme="fantasy"
      className="min-h-screen bg-base-200 flex flex-col"
    >
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4 sm:px-6 py-3 flex justify-between items-center border-b border-base-300">
        <h1 className="text-3xl font-extrabold text-primary tracking-wide">
          Quiz Results
        </h1>

        <div className="flex gap-2 sm:gap-4">
          <button
            className="btn btn-sm sm:btn-md btn-accent flex items-center gap-2"
            onClick={handleReset}
          >
            <RotateCcw className="w-4 h-4" />
            Restart
          </button>

          <Link to="/logout" className="btn btn-sm sm:btn-md btn-error gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center w-full px-4 py-6 sm:px-8">
        <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 gap-8">
          {/* Score Summary */}
          <div className="card bg-base-100 shadow-xl p-6 rounded-2xl border border-base-300 hover:shadow-2xl transition-all">
            <h2 className="text-xl font-semibold mb-6">Score Summary</h2>

            {/* Radial Score */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64">
                <div
                  className="radial-progress text-primary w-full h-full"
                  style={{ "--value": correctRate }}
                  role="progressbar"
                ></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl sm:text-5xl font-bold text-primary">
                    {noOfCorrectAswers}
                  </span>
                  <span className="text-sm sm:text-lg text-base-content/70 mt-1">
                    Correct
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="stat bg-base-200 rounded-lg p-4">
                <div className="stat-title">Attempts</div>
                <div className="stat-value text-primary text-2xl">
                  {attempts.attempts}
                </div>
              </div>

              <div className="stat bg-base-200 rounded-lg p-4">
                <div className="stat-title">Completion</div>
                <div className="stat-value text-success text-2xl">100%</div>
              </div>

              <div className="stat bg-base-200 rounded-lg p-4">
                <div className="stat-title">Total Questions</div>
                <div className="stat-value text-primary text-2xl">
                  {totalQuestions}
                </div>
              </div>

              <div className="stat bg-base-200 rounded-lg p-4">
                <div className="stat-title text-success">Correct</div>
                <div className="stat-value text-success text-2xl">
                  {noOfCorrectAswers}
                </div>
              </div>

              <div className="stat bg-base-200 rounded-lg p-4">
                <div className="stat-title text-error">Incorrect</div>
                <div className="stat-value text-error text-2xl">
                  {noOfInCorrectAnswers}
                </div>
              </div>
            </div>
          </div>

          {/* Answer Breakdown */}
          <div className="card bg-base-100 shadow-xl p-6 rounded-2xl border border-base-300 hover:shadow-2xl transition-all">
            <h2 className="text-xl font-semibold mb-6">Your Answers</h2>
            <ul className="space-y-4">
              {displayQuestions?.length ? (
                displayQuestions.map((item, index) => (
                  <li
                    key={item.question_id}
                    className={`p-4 rounded-xl border ${
                      correctAnswers.includes(item)
                        ? "border-success bg-success/10"
                        : "border-error bg-error/10"
                    }`}
                  >
                    <p className="font-semibold text-base mb-1">
                      {index + 1}. {item.question}
                    </p>

                    <p className="text-sm">
                      Your Answer:{" "}
                      <span
                        className={`font-bold ${
                          correctAnswers.includes(item)
                            ? "text-success"
                            : "text-error"
                        }`}
                      >
                        {item.submitted_answer.value}
                      </span>
                    </p>

                    {inCorrectAnswers.includes(item) && (
                      <p className="text-sm mt-1">
                        Correct Answer:{" "}
                        <span className="font-bold text-success">
                          {item.answer.value}
                        </span>
                      </p>
                    )}
                  </li>
                ))
              ) : (
                <p>No answers found.</p>
              )}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default QuizResults;
