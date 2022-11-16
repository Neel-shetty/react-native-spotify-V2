import { createSlice } from "@reduxjs/toolkit";
import PlaylistData from "../../../../assets/dummydata/PlaylistData";
import previewData from "../../../../assets/dummydata/previewData";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { useState } from "react";

const [sound, setSound] = useState(null);
const [songStatus, setSongStatus] = useState("");
const [position, setPosition] = useState();
const [currentAudio, setCurrentAudio] = useState();

const initialState = {
  songDetails: songStatus,
};

const songSlice = createSlice({
  name: "songDetails",
  initialState,
  reducers: {
    // setIsPlayingFalse: (state, action)=>{
    //   state.isPlaying = true
    // }
    pause: (state) => {
      Sound.createAsync({ shouldPlay: false });
      state.songDetails.isPlaying = false;
    },
  },
});
