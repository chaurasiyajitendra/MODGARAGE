import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "../slices/carSlice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
});