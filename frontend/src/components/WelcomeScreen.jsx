import React from "react";
import QuestionBubble from "../assets/question-bubble.png"
import GreenCheckMark from "../assets/check-circle-green.svg"
import QuizLogo from "./ui/QuizLogo";
import Card from "./ui/Card";
import Button from "./ui/Button";

const WelcomeScreen = () => {
  return (
    <section className="welcome-section">
      <QuizLogo size="large" />
      <Card className="welcome-card">
        <div className="welcome-card-content-top">
          <img src={QuestionBubble} alt="" width={172} />
          <h2>Are you ready?</h2>
          <h3>Lets see how many question you can answer</h3>
        </div>

        <ul className="welcome-card-list">
          <li className="list-item">
            <img src={GreenCheckMark} alt="" />
            There are 30 Questions
          </li>
          <li className="list-item">
            <img src={GreenCheckMark} alt="" />
            You need to pick 1 answer
          </li>
        </ul>

        <Button className="btn large hover" size="large">
          I'm Ready - Start the Quiz
        </Button>
      </Card>
    </section>
  );
};

export default WelcomeScreen;
