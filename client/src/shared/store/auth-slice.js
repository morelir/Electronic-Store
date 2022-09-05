import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: undefined,
    email: "",
    name: "",
    image: "",
    tokenExpirationDate: undefined,
    isLoggedIn: false,
  },
  reducers: {
    login(state, action) {
      const { token, email,name,image, expirationDate } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.name = name;
      state.image = image;
      state.token = token;
      let tokenExpirationDate =
        expirationDate ??
        new Date(new Date().getTime() + 1000 * 60 * 60).toISOString();
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
      state.email = "";
      state.name = "";
      state.image = "";
      state.tokenExpirationDate = undefined;
      state.isLoggedIn = false;
      localStorage.removeItem("userData");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
