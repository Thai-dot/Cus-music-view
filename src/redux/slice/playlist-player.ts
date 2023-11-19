import { IExtendPlaylist } from "@/types/interface/IPlayList";
import { IExtendPlaylistSong } from "@/types/interface/IPlaylistSong";
import { ISong } from "@/types/interface/ISongDTO";
import randomList from "@/utils/random-list";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IPlaylistPlayerState {
  currentPlayedSong: ISong | null | undefined;
  songLists: IExtendPlaylistSong[];
  isShuffleMode: boolean;
  currentPlaylist: IExtendPlaylist | null;
  arrayOfPlayedSong: number[];
  randomShuffleArray: number[];
  currentSongDuration: number;
  isMusicPlaying: boolean;
}

const initialState: IPlaylistPlayerState = {
  currentPlayedSong: null,
  isMusicPlaying: false,
  songLists: [],
  isShuffleMode: false,
  currentPlaylist: null,
  randomShuffleArray: [],
  arrayOfPlayedSong: [],
  currentSongDuration: 0,
};

export const playlistPlayerSlice = createSlice({
  name: "playlistPlayer",
  initialState,
  reducers: {
    setCurrentPlaylist: (state, action: PayloadAction<IExtendPlaylist>) => {
      state.currentPlaylist = action.payload;

      const sortOrderArray = [...action.payload.song ?? []].sort(
        (a, b) => a.order - b.order
      );
      state.songLists = sortOrderArray;
      if (action.payload.song?.length > 0) {
        state.currentPlayedSong = sortOrderArray[0].Song ?? null;

        state.randomShuffleArray = randomList(action.payload.song.length);
      }
    },
    setShuffleMode: (state, action: PayloadAction<boolean>) => {
      state.isShuffleMode = action.payload;
    },
    setIsPlayingMusic: (state, action: PayloadAction<boolean>) => {
      state.isMusicPlaying = action.payload;
    },
    setCurrentSongDuration: (state, action: PayloadAction<number>) => {
      state.currentSongDuration = action.payload;
    },
    switchIndex: (state, action: PayloadAction<number>) => {
      const { songLists, isShuffleMode, randomShuffleArray } = state;

      const currentIndex = action.payload;
      let nextIndex = -1;
      if (songLists.length > 0) {
        if (isShuffleMode) {
          // Shuffle the songs if the array is empty
          let shuffledSongs = randomShuffleArray.length
            ? randomShuffleArray
            : randomList(songLists.length);

          // Remove the current song from the array
          shuffledSongs = shuffledSongs.filter((num) => num !== currentIndex);

          // Get the next song from the array
          nextIndex = shuffledSongs[0];

          // Update the state with the new array
          state.randomShuffleArray = shuffledSongs;
        } else {
          nextIndex =
            currentIndex === songLists.length - 1 ? 0 : currentIndex + 1;
        }

        state.currentPlayedSong = songLists[nextIndex].Song;
      }
    },
    switchCurrentSong: (state, action: PayloadAction<ISong | null>) => {
      if (state.songLists.length > 0) {
        state.randomShuffleArray = randomList(state.songLists.length);
      }
      if (state.arrayOfPlayedSong.length === state.songLists.length) {
        state.arrayOfPlayedSong = [];
      }

      if (state?.currentPlayedSong?.id) {
        const arrayOfSongIds = state.songLists.map((song) => song.songID);
        const currentSongIndex = arrayOfSongIds.indexOf(
          state.currentPlayedSong.id
        );
        state.arrayOfPlayedSong.push(currentSongIndex);

        state.currentPlayedSong = action.payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrentPlaylist,
  setShuffleMode,
  switchCurrentSong,
  setCurrentSongDuration,
  switchIndex,
  setIsPlayingMusic,
} = playlistPlayerSlice.actions;

export default playlistPlayerSlice.reducer;
