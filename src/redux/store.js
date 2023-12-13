import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import dataReducer from "./apiSlice";
import modalReducer from "./modalSlice";
import albumsReducer from "./albums";
import messageReducer from "./message";

const store = configureStore({
  reducer: {
    auth: authReducer,
    images: dataReducer,
    albums: albumsReducer,
    modalReducer: modalReducer,
    successMessage: messageReducer,
  },
});

export default store;
