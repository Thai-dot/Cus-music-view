import SONG_TYPE from "@/types/enum/song-type";
import { IPlayList } from "@/types/interface/IPlayList";
import { ISong } from "@/types/interface/ISongDTO";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type PlaylistSectionType = "all" | "love";
export interface ISongState {
  currentSortBy: "name" | "type";
  searchName: "";
  sortType: "asc" | "desc";
  visibility: "" | boolean;
  type: "";
  playlist: IPlayList | undefined;
  musicPlayerDisplay: boolean;
  currentSongOnPlaylist: ISong | undefined;
  playlistSectionType: PlaylistSectionType;
}

const initialState: ISongState = {
  searchName: "",
  type: "",
  visibility: "",
  musicPlayerDisplay: false,
  playlist: undefined,
  currentSortBy: "name",
  sortType: "asc",
  currentSongOnPlaylist: undefined,
  playlistSectionType: "all",
};

type queryType = "searchName" | "type" | "visibility";

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setQueryPlaylist: (
      state,
      action: PayloadAction<{ queryType: queryType; value: any }>
    ) => {
      state[action.payload.queryType] = action.payload.value;
    },
    setSortType: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortType = action.payload;
    },
    setSortBy: (state, action: PayloadAction<"name" | "type">) => {
      state.currentSortBy = action.payload;
    },
    setPlaylistSectionType: (
      state,
      action: PayloadAction<PlaylistSectionType>
    ) => {
      state.playlistSectionType = action.payload;
    },
    setMusicPlayerDisplay: (state, action: PayloadAction<boolean>) => {
      state.musicPlayerDisplay = action.payload;
    },
    setMusicToPlayer: (state, action: PayloadAction<ISong>) => {
      state.currentSongOnPlaylist = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setQueryPlaylist,
  setMusicPlayerDisplay,
  setMusicToPlayer,
  setSortType,
  setSortBy,
  setPlaylistSectionType,
} = playlistSlice.actions;

export default playlistSlice.reducer;
