import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import questionReducer from "./slices/QuestionSlice.js";
import resultReducer from "./slices/ResultSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionReducer,
    result: resultReducer,
  },
});

export default store;
