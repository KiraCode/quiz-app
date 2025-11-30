const express = require("express");
const { getQuestions } = require("../controllers/questionController.js");
const authenticateUser = require("../middleware/userMiddleware.js");

const questionRouter = express.Router();

questionRouter.get("/", authenticateUser, getQuestions);

module.exports = questionRouter;