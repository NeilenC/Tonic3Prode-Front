import { createReducer } from "@reduxjs/toolkit";
import { userAction } from "../actions/users";

const initialState = {
  name: "NEILEN",
};

export const userReducer = createReducer(initialState, {
  [userAction]: (state, payload) => {
    state = action.payload;
  },
});
