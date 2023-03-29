// STORE CREATION
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { userReducer } from "./reducers/users";


import firstLoginReducer from "./reducers/firstLogin";
import uidReducer from "./reducers/uid";
import userInfo from "./reducers/userInfo";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    firstLogin: firstLoginReducer,
    uid: uidReducer,
    userInfo: userInfo,
  },
});

export default store;