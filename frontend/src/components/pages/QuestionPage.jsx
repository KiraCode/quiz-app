import React, { useCallback, useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useQuestionState from "../../hooks/useQuestionState";
import {
  fetchQuestionsAPI,
  submitQuizAPI,
  validateAnswerAPI,
} from "../../store/thunk/questionsThunk.js";
import Option from "../../components/pages/Option";
import { activeNextQuestion } from "../../store/slices/questionSlice.js";
import {
  fetchAttemptsAPI,
  fetchCompleteQuizApi,
} from "../../store/thunk/resultThunk.js";
import Footer from "./Footer";

const QuestionPage = () => {
  const [userSelectedOption, setUserSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    activeQuestion,
    activeQuestionNumber,
    totalQuestions,
    activeQuestionId,
    loading,
    isValidatingAnswer,
    isSubmittingQuiz,
    error,
  } = useQuestionState();

  // Fetch questions once
  useEffect(() => {
    dispatch(fetchQuestionsAPI());
  }, [dispatch]);

  // Reset option when question changes
  useEffect(() => {
    setUserSelectedOption(null);
    setIsAnswered(false);
  }, [activeQuestionId]);

  const handleOptionClick = useCallback(
    async (selectedOption) => {
      if (isAnswered || isValidatingAnswer) return;
      setUserSelectedOption(selectedOption);

      try {
        await dispatch(
          validateAnswerAPI({
            questionId: activeQuestionId,
            answer: selectedOption
          })
        ).unwrap();
      } catch (error) {
        console.error("error validating answer", error);
      } finally {
        setIsAnswered(true);
      }
    },
    [activeQuestionId, dispatch, isAnswered, isValidatingAnswer]
  );

  const isFinalQuestion = activeQuestionNumber === totalQuestions;

  const moveForward = useCallback(() => {
    if (isFinalQuestion) {
      dispatch(submitQuizAPI({}));
      setTimeout(() => {
        dispatch(fetchCompleteQuizApi());
        dispatch(fetchAttemptsAPI());
        navigate("/result");
      }, 500);
    } else {
      dispatch(activeNextQuestion());
    }
  }, [dispatch, isFinalQuestion, navigate]);

  if (loading || !activeQuestionId) {
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
          Quiz
        </h1>

        <Link to="/logout" className="btn btn-sm sm:btn-md btn-error gap-2">
          <LogOut className="w-4 h-4" />
          Logout
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-start w-full px-4 lg:px-10 py-4">
        {/* Progress Bar */}
        <div className="w-full max-w-3xl mb-5">
          <div className="h-3 bg-base-300 rounded-full overflow-hidden">
            <div
              className="h-3 bg-primary transition-all duration-500"
              style={{
                width: `${(activeQuestionNumber / totalQuestions) * 100}%`,
              }}
            />
          </div>
          <p className="text-sm text-base-content/70 mt-1">
            Question {activeQuestionNumber} of {totalQuestions}
          </p>
        </div>

        {/* Question Card */}
        <div className="card w-full max-w-3xl bg-base-100 shadow-xl rounded-2xl p-6 sm:p-10 border border-base-300">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-primary text-white px-6 py-2 font-bold shadow-md">
              {activeQuestionNumber}/{totalQuestions}
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center leading-relaxed">
            {activeQuestion.question}
          </h2>

          {/* Options */}
          <div className="flex flex-col gap-4 mb-8">
            {activeQuestion.options.map((option) => {
              const isSelected = userSelectedOption?.id === option.id;

              const isCorrect =
                activeQuestion.answer_status === "right" && isSelected;

              const isWrong =
                isSelected && activeQuestion.answer_status === "wrong";

              return (
                <Option
                  key={option.id}
                  option={option}
                  isSelected={isSelected}
                  isCorrect={isCorrect}
                  isWrong={isWrong}
                  isAnswered={isAnswered}
                  isValidating={isValidatingAnswer && isSelected}
                  onClick={handleOptionClick}
                />
              );
            })}
          </div>

          {/* Next Button */}
          <div className="flex justify-center">
            <button
              className={`btn w-full sm:w-auto px-10 text-lg ${
                isFinalQuestion ? "btn-success" : "btn-primary"
              } ${isSubmittingQuiz ? "loading" : ""}`}
              onClick={moveForward}
              disabled={!isAnswered || isSubmittingQuiz}
            >
              {isSubmittingQuiz
                ? "Submitting..."
                : isFinalQuestion
                ? "Submit Quiz"
                : "Next →"}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default QuestionPage;
