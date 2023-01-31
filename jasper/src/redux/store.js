import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import formReducer from "./form.js";

const reducer = combineReducers({
  form: formReducer,
});

const store = configureStore({ reducer });

export default store;
