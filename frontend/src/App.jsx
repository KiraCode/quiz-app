import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";

const App = () => {
  const [viewScreen, setViewScreen] = useState("result");
  return (
    <div>
      {viewScreen === "welcome" && <WelcomeScreen />}
      {viewScreen === "question" && <QuestionScreen />}
       {viewScreen === "result" && <ResultScreen />}
    </div>
  );
};

export default App;
