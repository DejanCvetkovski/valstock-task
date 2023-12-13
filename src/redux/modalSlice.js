import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemId: "",
  isOpen: false,
};

const modalSlice = createSlice({
  name: "showModal",
  initialState: initialState,
  reducers: {
    showModal: (state, action) => {
      state.itemId = action.payload;
      state.isOpen = true;
    },
    hideModal: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
