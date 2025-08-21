import React from "react";
import Logo from "../../assets/quiz-logo.svg";

const allsizes = {
  small: 168,
  large: 386,
};

const QuizLogo = ({ size = "small" }) => {
  return <img src={Logo} alt="quiz logo" width={allsizes[size]} />;
};

export default QuizLogo;
