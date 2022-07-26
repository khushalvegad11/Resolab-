import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./header/headerSlice";

export default configureStore({
  reducer: {
    headerReducer,
  },
});
