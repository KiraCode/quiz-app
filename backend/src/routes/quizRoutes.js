const express = require("express");
const { submitQuiz } = require("../controllers/submitController.js");
const authenticateUser = require("../middleware/userMiddleware.js");

const quizRouter = express.Router();

quizRouter.post("/submit", authenticateUser, submitQuiz);

module.exports = {quizRouter}