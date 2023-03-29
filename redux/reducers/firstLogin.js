import { createAction, createReducer } from "@reduxjs/toolkit";

export const setFirstLogin = createAction("SET_LOGINFORM");



const reducer = createReducer(false, {
  [setFirstLogin]: (state, action) => action.payload,
});

export default reducer;
