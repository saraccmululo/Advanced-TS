import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cart-slice";

export const store=configureStore({
  reducer:{
    cart: cartSlice.reducer
  }
});

export type AppDispatch= typeof store.dispatch;
export type RootState=ReturnType<typeof store.getState>;