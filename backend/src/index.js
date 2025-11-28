const express = require("express");
const cors = require("cors");
const db = require("./utils/db.js");
const userRouter = require("./routes/userRoutes.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// db connection
db();

// routes middleware
app.use("/api/v1/users", userRouter);

// connect server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 😍...`);
});
