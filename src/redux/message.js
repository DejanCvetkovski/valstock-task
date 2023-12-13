import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  showMessage: false,
};

const messageSlice = createSlice({
  name: "successMessage",
  initialState: initialState,
  reducers: {
    showMessage: (state, action) => {
      state.message = action.payload.message;
      state.showMessage = true;
    },
    hideMessage: (state) => {
      state.showMessage = false;
    },
  },
});

export const { showMessage, hideMessage } = messageSlice.actions;
export default messageSlice.reducer;
