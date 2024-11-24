import { configureStore } from '@reduxjs/toolkit';
import win from "./slices/winSlice";
export const store=configureStore({
  reducer:{win,},
}); 