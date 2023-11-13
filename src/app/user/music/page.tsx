"use client";

import DisplayMusicSection from "@/components/user/music/display-music-section";
import MusicPlayer from "@/components/user/music/music-player";
import SortMusicSection from "@/components/user/music/sort-music-section";
import { setMusicPlayerDisplay } from "@/redux/slice/song";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React from "react";

export default function Music() {
  const music = useAppSelector((state) => state.songSliceReducer);
  const dispatch = useAppDispatch();

  return (
    <div>
      <SortMusicSection />
      <DisplayMusicSection />

        <MusicPlayer
          isOpenPlayer={music.musicPlayerDisplay}
          onClose={() => dispatch(setMusicPlayerDisplay(false))}
          song={music.song}
        />
  
    </div>
  );
}
