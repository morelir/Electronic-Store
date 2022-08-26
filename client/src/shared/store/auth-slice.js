import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: undefined,
    tokenExpirationDate: undefined,
    userId: undefined,
    isLoggedIn: false,
  },
  reducers: {
    login(state, action) {
      const { token, userId, expirationDate } = action.payload;
      state.isLoggedIn = true;
      state.token = token;
      state.userId = userId;
      let tokenExpirationDate= expirationDate ??  new Date(new Date().getTime() + 1000 * 60 * 60).toISOString();
      state.tokenExpirationDate = tokenExpirationDate;
      // localStorage.setItem(
      //   "userData",
      //   JSON.stringify({
      //     userId: userId,
      //     token: token,
      //     expiration: tokenExpirationDate,
      //   })
      // );
    },
    logout(state) {
      state.token = undefined;
      state.tokenExpirationDate = undefined;
      state.userId = undefined;
      state.isLoggedIn = false;
      localStorage.removeItem("userData");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
