import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    id:null,
    products: [],
    totalAmount: 0,
    totalQuantity: 0,
    isLoading:false,
  },
  reducers: {
    setIsLoading(state,action){
      state.isLoading=action.payload.isLoading;
    },
    replaceCart(state, action) {
      state.id = action.payload.id;
      state.products = action.payload.products;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalAmount= action.payload.totalAmount;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
