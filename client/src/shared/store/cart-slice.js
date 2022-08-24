import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalAmount: 0,
    totalQuantity: 0,
    changed:false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.products = action.payload.products;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.products.find((item) => item.id === newItem.id);
      state.totalQuantity += newItem.amount;
      state.totalAmount += newItem.price * newItem.amount;
      state.changed = true;
      if (!existingItem) {
        state.products.push({
          id: newItem.id,
          amount: newItem.amount,
        });
      } else {
        existingItem.amount += newItem.amount;
      }
    },
    removeItemFromCart(state, action) {
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
