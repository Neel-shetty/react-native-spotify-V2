import { createSlice } from "@reduxjs/toolkit";
import PlaylistData from "../../../../assets/dummydata/PlaylistData";

const initialState = {
  likedSongs: PlaylistData,
  isLoading: true,
  amount: 7,
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    unlikeAll: (state) => {
      state.likedSongs = [];
    },
    likeAll: (state) => {
      state.likedSongs = [...PlaylistData]
    },
    
  },
});

//console.log(likeSlice )

export const { unlikeAll, likeAll } = likeSlice.actions;
export default likeSlice.reducer;
