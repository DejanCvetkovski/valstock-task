import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
  user: {
    username: "",
    password: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { username, password } = action.payload;
      state.user.username = username;
      state.user.password = password;
    },
    login: (state) => {
      localStorage.setItem("isLoggedIn", "true");
      state.isLoggedIn = true;
      state.user.username = "";
      state.user.password = "";
    },
    logout: (state) => {
      localStorage.setItem("isLoggedIn", "false");
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
