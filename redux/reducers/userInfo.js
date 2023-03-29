import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUserInfo = createAction("SET_USERINFO");

const initialState = {
  email: "",
  name: "",
  lastName: "",
};

export const reducer = createReducer(initialState, {
  [setUserInfo]: (state, action) => {
  const fullName = action.payload.fullName.split(" ");
  const name = fullName[0];
  const lastName = fullName[fullName.length - 1];   

    const email = action.payload.email;

    return { email: email, name: name, lastName: lastName };
  },
});

export default reducer;
