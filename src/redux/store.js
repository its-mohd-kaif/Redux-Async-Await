import { configureStore } from "@reduxjs/toolkit";
import reduxSlice from "./reduxSlice";

const store = configureStore({
  reducer: {
    products: reduxSlice,
  },
});

export default store;
