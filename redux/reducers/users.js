import { createReducer } from "@reduxjs/toolkit";
import { userAction } from "../actions/users";

const initialState = {
  name: "USUARIO",
};

const userReducer = createReducer(initialState, {
  [userAction]: (state, payload) => {
    state = action.payload;
  },
});
