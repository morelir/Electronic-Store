import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    id:null,
    products: [],
    totalAmount: 0,
    totalQuantity: 0,
    changed:false,
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
    addItemToCart(state, action) { //using that logic in the backend
      const newItem = action.payload;
      const existingItem = state.products.find((item) => item.id === newItem.id);
      state.totalQuantity += newItem.amount;
      state.totalAmount += newItem.price * newItem.amount;
      state.changed = true;//?
      if (!existingItem) {
        state.products.push({
          id: newItem.id,
          amount: newItem.amount,
        });
      } else {
        existingItem.amount += newItem.amount;
      }
    },
    removeItemFromCart(state, action) { //using that logic in the backend
      const id = action.payload;
      const existingItem = state.products.find((item) => item.id === id);
      state.totalQuantity--;
      state.totalAmount -= existingItem.price
      state.changed = true;
      if (existingItem.amount === 1) {
        state.products = state.products.filter((item) => item.id !== id);
      } else {
        existingItem.amount--;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
