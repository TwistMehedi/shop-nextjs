import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import { authApi } from "../api/authApi";
import userSLice from "../slice/userSlice.js"
import storage from "../storage";
 
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user"],
};
 
const rootReducer = combineReducers({
  user: userSLice,
  [authApi.reducerPath]: authApi.reducer,  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(authApi.middleware),
});

// console.log("Redux Store:", store.getState());

export const persistor = persistStore(store);