import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUserInfo = createAction("SET_USERINFO");

const initialState = {
  uid: "",
  username: "",
  address:"",
  email: "",
  name: "",
  lastName: "",
  cellphone: "",
  country: "",
  photoURL:"",
};

export const reducer = createReducer(initialState, {
  [setUserInfo]: (state, action) => {
  const username = action.payload.username
  const country = action.payload.country;   
  const  uid = action.payload.uid
  const photoURL = action.payload.photoURL
  const address = action.payload.address
  const cellphone = action.payload.cellphone;   
  const fullName = action.payload.fullName.split(" ");
  const name = fullName[0];
  const lastName = fullName[fullName.length - 1];   
  const email = action.payload.email;

    return { email: email, name: name, lastName: lastName, country: country, cellphone: cellphone, username: username, uid: uid, address: address, photoURL:photoURL };
  },
});

export default reducer;
