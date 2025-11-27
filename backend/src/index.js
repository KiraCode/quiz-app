const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// express middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// connect server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 😍...`);
});
