import { configureStore } from "@reduxjs/toolkit";
import { generalesSlice } from "./slices/generalesSlice";

export const store = configureStore({
  reducer: {
    generales: generalesSlice.reducer,
  },
});
