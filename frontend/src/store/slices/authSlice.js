import { createSlice } from "@reduxjs/toolkit";
import { signAPI } from "../thunk/authThunk";

const initialState = {
  isAuthenticated: Boolean(localStorage.getItem("accessToken")?.trim()),
  email: localStorage.getItem("email")?.trim() || null,
  loading: false,
  error: null,
  isTokenExpired: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers(builder) {
    builder.addCase(signAPI.pending, (state) => {
      (state.isAuthenticated = false),
        (state.email = null),
        (state.error = null),
        (satisfies.loading = true);
    });
    builder.addCase(signAPI.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.loading = false;
      state.email = user.email;
    });
    builder.addCase(signAPI.rejected, (state, action) => {
      const errorMesssage = action.payload;
      state.loading = false;
      state.error = errorMesssage;
    });
  },
});

export default authSlice.reducer;
