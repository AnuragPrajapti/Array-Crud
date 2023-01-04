import { configureStore } from "@reduxjs/toolkit";
import createApiSlice from "./userSlice";

 const store = configureStore({
  reducer: createApiSlice,
});

export default store;