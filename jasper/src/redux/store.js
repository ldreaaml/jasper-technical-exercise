import { combineReducers, createStore } from "redux";
import formReducer from "./form.js";

const reducer = combineReducers({
  form: formReducer,
});

const store = createStore(reducer);

export default store;
