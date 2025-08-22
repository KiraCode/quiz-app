import React, { useCallback, useEffect, useMemo, useState } from "react";
import QuestionContext from "../context/QuestionContext";

const QuestionProvider = ({ children }) => {
  // API calling, Functions, Properties
  const [questions, setQuestions] = useState([]);
  const [activeQuestionId, setActiveQuestionId] = useState("");

  const processQuestions = useCallback((questionAPIResponse) => {
    setQuestions(
      questionAPIResponse.map((question) => ({
        ...question,
        hasAttempted: false,
        isAnswerCorrect: false,
      }))
    );
    setActiveQuestionId(questionAPIResponse[0]._id);
  });

  const activeQuestion = useMemo(
    () => questions.find((question) => question._id === activeQuestionId),
    [activeQuestionId, questions]
  );

  const activeQuestionNumber = useMemo(
    () => questions.findIndex((quest) => quest._id === activeQuestionId) + 1,
    [activeQuestionId, questions]
  );

  const totalQuestions = useMemo(() => questions.length(), [questions]);

  const updateQuestionStatus = useCallback((isAnswerCorrect) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question._id === activeQuestionId
          ? { ...question, hasAttempted: true, isAnswerCorrect }
          : question
      )
    );
  });

  useEffect(() => {
    // this code will run after the component re-render due to 'questions' changing
    console.log("Question state have been updated", questions);
    // check the console here to see if hasAttempted is true for the correct option
  }, [questions]);

  //   function to update active questionId
  const activeNextQuestion = useCallback(() => {
    const currentIndex = questions.findIndex(
      (question) => question._id === activeNextQuestion
    );
    if (currentIndex !== -1 && currentIndex + 1 < questions.length) {
      setActiveQuestionId(questions[currentIndex + 1]._id);
    }
  }, [activeQuestionId, questions]);

  //   function to findout number oof correct answer
  const correctAnswer = useMemo(() => {
    return questions.filter((question) => question.isAnswerCorrect).length;
  }, [questions]);

  const contextValue = useMemo(
    () => ({
      activeQuestion,
      activeQuestionNumber,
      totalQuestions,
      correctAnswer,
      processQuestions,
      updateQuestionStatus,
      activeNextQuestion,
    }),
    [
      activeQuestion,
      activeQuestionNumber,
      totalQuestions,
      correctAnswer,
      processQuestions,
      updateQuestionStatus,
      activeNextQuestion,
    ]
  );

  return (
    <QuestionContext.Provider value={{}}>{children}</QuestionContext.Provider>
  );
};

export default QuestionProvider;
