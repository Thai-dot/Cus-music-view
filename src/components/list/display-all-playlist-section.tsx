"use client";

import React from "react";

import { useAppSelector } from "@/redux/store";
import { useQuery } from "react-query";
import { fetchAllPlaylist } from "@/lib/axios/fetch/playlist/get-playlist";
import { INFINITE_SCROLL_PAGINATION_PLAYLIST_LIMIT } from "@/constant/config";
import CustomGridLoader from "@/components/ui-component/custom-grid-loader";
import { Frown } from "lucide-react";
import DisplayAllPlaylistInfiniteSection from "./display-infinite-all-playlist-section";

export default function DisplayAllPlaylistSection() {
  const playlist = useAppSelector((state) => state.playlistSliceReducer);

  const { data, isLoading, refetch } = useQuery("fetchAllPlaylistSection", () =>
    fetchAllPlaylist(
      1,
      INFINITE_SCROLL_PAGINATION_PLAYLIST_LIMIT,
      playlist.searchName,
      playlist.type,
      "",
      "",
      undefined,
      ""
    )
  );

  React.useEffect(() => {
    refetch();
  }, [
    refetch,
    playlist.searchName,
    playlist.type,

  ]);

  if (isLoading) return <CustomGridLoader />;

  return (
    <div>
      <div>
        {data?.data?.length === 0 ? (
          <div className="flex-center justify-center flex-col w-full mt-10">
            <Frown size={25} />
            <p>There is no result found :(</p>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-10 pb-20">
            <DisplayAllPlaylistInfiniteSection initialPlaylists={data.data} />
          </div>
        )}
      </div>
    </div>
  );
}
