import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAlbumAlreadyExist: false,
  myAlbums: [],
};

const albumsSlice = createSlice({
  name: "albums",
  initialState: initialState,
  reducers: {
    addAlbum: (state, action) => {
      state.myAlbums.push(action.payload);
    },
    addToExisting: (state, action) => {
      let id = action.payload.id;
      let addNewImage = action.payload.image;
      const albumIndex = state.myAlbums.findIndex((album) => album.id === id);

      if (albumIndex !== -1) {
        state.myAlbums[albumIndex].images.push(addNewImage);
      }
    },
    removeImage: (state, action) => {
      const { albumId, itemId } = action.payload;
      const albumIndex = state.myAlbums.findIndex(
        (album) => album.id === albumId
      );

      state.myAlbums[albumIndex].images = state.myAlbums[
        albumIndex
      ].images.filter((image) => image.id !== itemId);
    },
  },
});

export const { addAlbum, removeImage, addToExisting } = albumsSlice.actions;
export default albumsSlice.reducer;
