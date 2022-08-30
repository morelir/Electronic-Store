import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { isLoading: false, errorMessage: "", changeMainHeader: false },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
    setError(state, action) {
      state.errorMessage = action.payload.message;
    },
    setChangeMainHeader(state, action) {
      state.changeMainHeader = action.payload.changeMainHeader;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
