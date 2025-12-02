import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/apiRequest";
import { SIGNUP_ENDPOINT } from "../../utils/endpoints";

export const signAPI = createAsyncThunk(
  "auth/signup",
  async (values, thunkAPI) => {
    try {
      const response = await apiRequest({
        endpoint: SIGNUP_ENDPOINT,
        method: "POST",
        includeAuth: false,
        body: {
          name: values.username,
          email: values.email,
          password: values.password,
        },
      });

      const resJson = await response.json();
      if (response.ok) {
        return resJson;
      } else {
        return thunkAPI.rejectWithValue(resJson.message);
      }
    } catch (error) {
      let sendError = "Could not register user, something went wrong...";
      if ("message" in error) {
        sendError = error.message;
      }
      return thunkAPI.rejectWithValue(sendError);
    }
  }
);
