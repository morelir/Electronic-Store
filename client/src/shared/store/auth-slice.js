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
      const { token, email, name, image, expirationDate } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.name = name;
      state.image = image;
      state.token = token;
      state.tokenExpirationDate = expirationDate;
    },
    logout(state) {
      state.token = undefined;
      state.email = "";
      state.name = "";
      state.image = "";
      state.tokenExpirationDate = undefined;
      state.isLoggedIn = false;
      // localStorage.removeItem("userData");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
