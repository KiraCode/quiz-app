const MAX_QUESTION_COUNT = 30;
const {
  UserQuiz: UserQuizModel,
  QUIZ_STATUS_PENDING,
  ANSWER_STATUS_PENDING,
  ANSWER_STATUS_RIGHT,
  ANSWER_STATUS_WRONG,
} = require("../models/userQuizModel.js");
const Question = require("../models/questionModel.js");

const getQuestions = async (req, res) => {
  try {
    // finding incomplete quiz for the user and populate question details in one query
    let userQuiz = await UserQuizModel.findOne({
      user_id: req.user._id,
      quiz_status: QUIZ_STATUS_PENDING,
    }).populate("questions.question_id", "question options");

    // if no incomplete quiz exists, create a new one
    if (!userQuiz) {
      // get random question from the database (without answer)
      const randomQuestions = await Question.aggregate([
        { $sample: { size: MAX_QUESTION_COUNT } },
        { $project: { question: 1, options: 1 } },
      ]);
      //   format questions for user quiz document
      const quizQuestions = randomQuestions.map((question) => ({
        question_id: question._id,
        attempted: false,
        answer_status: ANSWER_STATUS_PENDING,
        submitted_answer: null,
      }));

      //   create a new quiz and save
      userQuiz = await new UserQuizModel({
        user_id: req.user._id,
        quiz_status: QUIZ_STATUS_PENDING,
        questions: quizQuestions,
      }).save();

      // poplate the newly created quiz with question details
      userQuiz = await userQuiz.populate(
        "questions.question_id",
        "question options"
      );
    }

    // format the response data by combining question content with user's progress
    const questions = userQuiz.questions
      .map((q) => {
        if (!q.question_id) {
          return null;
        }
        return {
          _id: q.question_id._id,
          question: q.question_id.question,
          options: q.question_id.options,
          attempted: q.attempted,
          answer_status: q.answer_status,
          submitted_answer: q.submitted_answer,
        };
      })
      .filter((q) => q !== null); //remove all null entries

    return res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Something went rong while fetching the Question");
  }
};

module.exports = { getQuestions };
