import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUserInfo = createAction("SET_USERINFO");

const initialState = {
  email: "",
  name: "",
  lastName: "",
  country: "",
};

export const reducer = createReducer(initialState, {
  [setUserInfo]: (state, action) => {
  const country = action.payload.country;   
  const fullName = action.payload.fullName.split(" ");
  const name = fullName[0];
  const lastName = fullName[fullName.length - 1];   
  const email = action.payload.email;

    return { email: email, name: name, lastName: lastName, country: country };
  },
});

export default reducer;
