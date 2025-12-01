const {
  UserQuiz: UserQuizModel,
  QUIZ_STATUS_PENDING,
  QUIZ_STATUS_COMPLETED
} = require("../models/userQuizModel.js");
const Question = require("../models/questionModel.js");
const User = require("../models/userModel.js");

const submitQuiz = async (req, res) => {
  try {
    // find the current quiz
    let userCurrentQuiz = await UserQuizModel.findOne({
      user_id: req.user._id,
      quiz_status: QUIZ_STATUS_PENDING,
    });

    if (!userCurrentQuiz) {
      return res
        .status(500)
        .json({ success: false, message: "No active quiz for the user" });
    }

    // mark Quiz as Completed and save it
    userCurrentQuiz.quiz_status = QUIZ_STATUS_COMPLETED;

    // increase the attempts count
    const user = await User.findOne({ _id: req.user._id });
    user.quiz_attempts = user.quiz_attempts + 1;
    user.save();
    userCurrentQuiz.save()

    // create two arrays for showing what questions we selected wrong, what is there correct answer
    let incorrect_questions = [];
    let correct_questions = [];

    // loop through all quiz questions
    for (const userQuestion of userCurrentQuiz.questions) {
      const questionModel = await Question.findById(userQuestion.question_id);

      // build data object for question
      let _data = {
        question_id: userQuestion.question_id,
        question: questionModel.question,
        answer: questionModel.answer,
        attempted: userQuestion.attempted,
        answer_status: userQuestion.answer_status,
        submitted_answer: userQuestion.submitted_answer,
      };

      // check answers are correct or not and close the loop
      if (
        questionModel.answer.id === userQuestion.submitted_answer.id &&
        questionModel.answer.value === userQuestion.submitted.answer.value
      ) {
        correct_questions.push(_data);
      } else {
        incorrect_questions.push(_data);
      }
    }
    return res.send({
      status: true,
      result: userCurrentQuiz.result,
      incorrect_questions,
      correct_questions,
    });
  } catch (error) {
    console.error("Error Fetching quiz");
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { submitQuiz };
