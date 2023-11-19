"use client";

import DisplayAllPlaylistSection from "@/components/list/display-all-playlist-section";
import ListHero from "@/components/list/list-hero";
import PlaylistTypeSection from "@/components/list/playlist-type-section";
import SortListSection from "@/components/list/sort-list-section";
import { useAppSelector } from "@/redux/store";
import React from "react";

export default function ListsPage() {
  const { searchName, type } = useAppSelector(
    (state) => state.playlistSliceReducer
  );

  React.useEffect(() => {
    console.log("re-render");
  }, [searchName, type]);

  return (
    <div className="bg-[url('/image/white-space.png')] bg-repeat bg-auto w-full h-full bg-center">
      <div className="  px-5 py-24  container mx-auto">
        <ListHero />

        <SortListSection />
        {searchName?.length === 0 ? <PlaylistTypeSection /> : null}

        <DisplayAllPlaylistSection />
      </div>
    </div>
  );
}
