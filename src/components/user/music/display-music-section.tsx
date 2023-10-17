"use client";

import { Divider } from "@nextui-org/react";
import React from "react";
import MusicCard from "./music-card";
import { useQuery, useQueryClient } from "react-query";
import { fetchSongByUser } from "@/lib/axios/fetch/song/fetch-song-by-user";
import MusicCardListInfiniteSection from "./music-card-list-infinite-section";
import CustomGridLoader from "@/components/ui-component/custom-grid-loader";
import { INFINITE_SCROLL_PAGINATION_SONG_LIMIT } from "@/constant/config";
import { useAppSelector } from "@/redux/store";
import { Frown } from "lucide-react";

export default function DisplayMusicSection() {
  const song = useAppSelector((state) => state.songSliceReducer);

  const { data, isLoading, refetch } = useQuery("fetchSongByUser", () =>
    fetchSongByUser(
      1,
      INFINITE_SCROLL_PAGINATION_SONG_LIMIT,
      song.songName,
      song.type,
      song.visibility
    )
  );

  React.useEffect(() => {
    refetch();
  }, [
    song.isFormSubmitted,
    refetch,
    song.songName,
    song.type,
    song.visibility,
  ]);

  if (isLoading) return <CustomGridLoader />;

  return (
    <div>
      <Divider className="my-5 " />

      {data.data.length === 0 ? (
        <div className="flex-center justify-center flex-col w-full mt-10">
          <Frown size={25} />
          <p>There  is no result found :(</p>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-10 pb-20">
          <MusicCardListInfiniteSection initialSongs={data.data} />
        </div>
      )}
    </div>
  );
}
