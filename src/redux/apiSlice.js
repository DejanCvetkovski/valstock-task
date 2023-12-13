import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchApiData = createAsyncThunk("api/fetchApiData", async () => {
  const response = await fetch("https://picsum.photos/v2/list?page=2");
  return await response.json();
});

const apiSlice = createSlice({
  name: "images",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchApiData.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;

/*
The following block of code is a suggestion approach for implementation of feature "Load More"
*/

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const imagesApi = createApi({
//   reducerPath: "imagesApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "https://picsum.photos/v2" }),
//   endpoints: (builder) => ({
//     getImagesList: builder.query({
//       query: (page) => `/list?page=${page}`,
//       serializeQueryArgs: ({ endpointName }) => {
//         return endpointName;
//       },
//       merge: (currentCache, newItems) => {
//         currentCache.push(...newItems);
//       },
//       forceRefetch({ currentArg, previousArg }) {
//         return currentArg !== previousArg;
//       },
//     }),
//   }),
// });

// export const { useGetImagesListQuery } = imagesApi;
