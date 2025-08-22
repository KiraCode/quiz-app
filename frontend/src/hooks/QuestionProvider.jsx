import React from "react";
import QuestionContext from "../context/QuestionContext";

const QuestionProvider = ({ children }) => {
  // API calling, Functions, Properties
  return (
    <QuestionContext.Provider value={{}}>{children}</QuestionContext.Provider>
  );
};

export default QuestionProvider;
