import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import dataSlice from "./dataSlice";

export default configureStore({
  reducer: {
    // Свойство counter будет внутри объекта общего состояния: state.counter
    counter: counterReducer,
    data: dataSlice,
  },
});
