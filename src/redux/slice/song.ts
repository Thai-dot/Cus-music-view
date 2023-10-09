import SONG_TYPE from "@/types/enum/song-type";
import { ISong } from "@/types/interface/ISongDTO";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SongSortState {
  songName: string;
  type: SONG_TYPE | "";
  visibility: "" | true | false;
  musicPlayerDisplay: boolean;
  song?: ISong;
}

const initialState: SongSortState = {
  songName: "",
  type: "",
  visibility: "",
  musicPlayerDisplay: false,
  song: undefined,
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
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state[action.payload.sortType] = action.payload.value;
    },
    setMusicPlayerDisplay: (state, action: PayloadAction<boolean>) => {
      state.musicPlayerDisplay = action.payload;
    },
    setMusicToPlayer: (state, action: PayloadAction<ISong>) => {
      state.song = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSortSong, setMusicPlayerDisplay, setMusicToPlayer } =
  songSlice.actions;

export default songSlice.reducer;
