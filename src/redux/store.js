import { configureStore } from "@reduxjs/toolkit";
import reduxSlice from "./reduxSlice";
// Redux Store
const store = configureStore({
  reducer: {
    products: reduxSlice,
  },
});

export default store;
