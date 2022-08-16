import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity += action.item.amount;
      state.totalAmount += action.item.price * action.item.amount;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          amount: newItem.amount,
          name: newItem.title,
        });
      } else {
        existingItem.amount += newItem.amount;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.totalAmount -= existingItem.price
      if (existingItem.amount === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.amount--;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
