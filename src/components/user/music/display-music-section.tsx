"use client";

import { Divider } from "@nextui-org/react";
import React from "react";
import MusicCard from "./music-card";
import { useQuery } from "react-query";
import { fetchSongByUser } from "@/lib/axios/fetch/song/fetch-song-by-user";
import MusicCardListInfiniteSection from "./music-card-list-infinite-section";
import CustomGridLoader from "@/components/ui-component/custom-grid-loader";
import { INFINITE_SCROLL_PAGINATION_SONG_LIMIT } from "@/constant/config";
import { useAppSelector } from "@/redux/store";

export default function DisplayMusicSection() {

  const song = useAppSelector((state) => state.songSliceReducer)

  const { data, isLoading } = useQuery("fetchSongByUser", () =>
    fetchSongByUser(1, INFINITE_SCROLL_PAGINATION_SONG_LIMIT)
  );

 
  if (isLoading) return <CustomGridLoader />;

  return (
    <div>
      <Divider className="my-5 " />

      <div className="grid grid-cols-12 gap-10 pb-20">
      
        <MusicCardListInfiniteSection initialSongs={data.data} />
      </div>
    </div>
  );
}
