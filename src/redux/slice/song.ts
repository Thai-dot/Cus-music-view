import SONG_TYPE from "@/types/enum/song-type";
import { ISong } from "@/types/interface/ISongDTO";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ISongState {
  songName: string;
  type: SONG_TYPE | "";
  visibility: "" | true | false;
  musicPlayerDisplay: boolean;
  song?: ISong;
  isFormSubmitted?: boolean;
}

const initialState: ISongState = {
  songName: "",
  type: "",
  visibility: "",
  musicPlayerDisplay: false,
  song: undefined,
  isFormSubmitted: false,
};

type SortType = "songName" | "type" | "visibility";

export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setSortSong: (
      state,
      action: PayloadAction<{ sortType: SortType; value: any }>
    ) => {
      state[action.payload.sortType] = action.payload.value;
    },
    setMusicPlayerDisplay: (state, action: PayloadAction<boolean>) => {
      state.musicPlayerDisplay = action.payload;
    },
    setMusicToPlayer: (state, action: PayloadAction<ISong>) => {
      state.song = action.payload;
    },
    setFormSubmitted: (state, action: PayloadAction<boolean>) => {
      state.isFormSubmitted = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSortSong,
  setMusicPlayerDisplay,
  setMusicToPlayer,
  setFormSubmitted,
} = songSlice.actions;

export default songSlice.reducer;
