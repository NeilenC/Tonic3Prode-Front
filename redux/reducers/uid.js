import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUid = createAction("SET_UID");

const reducer = createReducer("", {
  [setUid]: (state, action) => action.payload,
});

export default reducer;
