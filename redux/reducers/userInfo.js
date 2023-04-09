import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUserInfo = createAction("SET_USERINFO");

const initialState = {
  uid: "",
  username: "",
  email: "",
  name: "",
  lastName: "",
  cellphone: "",
  country: "",
};

export const reducer = createReducer(initialState, {
  [setUserInfo]: (state, action) => {
    const username = action.payload.username
  const country = action.payload.country;   
  const  uid = action.payload.uid
  const cellphone = action.payload.cellphone;   
  const fullName = action.payload.fullName.split(" ");
  const name = fullName[0];
  const lastName = fullName[fullName.length - 1];   
  const email = action.payload.email;

    return { email: email, name: name, lastName: lastName, country: country, cellphone: cellphone, username: username, uid: uid };
  },
});

export default reducer;
