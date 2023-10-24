"use client";

import React from "react";

import { useAppSelector } from "@/redux/store";
import { useQuery } from "react-query";
import { fetchPlayListByUser } from "@/lib/axios/fetch/playlist/get-playlist";
import { INFINITE_SCROLL_PAGINATION_PLAYLIST_LIMIT } from "@/constant/config";
import CustomGridLoader from "@/components/ui-component/custom-grid-loader";
import { Divider } from "@nextui-org/react";
import { Frown } from "lucide-react";
import PlayListCardListInfiniteSection from "./playlist-card-list-infinite-section";

export default function DisplayPlaylistSection() {
  const playlist = useAppSelector((state) => state.playlistSliceReducer);

  const { data, isLoading, refetch } = useQuery("fetchPlaylistByUser", () =>
    fetchPlayListByUser(
      1,
      INFINITE_SCROLL_PAGINATION_PLAYLIST_LIMIT,
      playlist.searchName,
      playlist.type,
      playlist.visibility,
      playlist.currentSortBy,
      playlist.sortType,
    
    )
  );

  React.useEffect(() => {
    refetch();
  }, [
    refetch,
    playlist.searchName,
    playlist.type,
    playlist.visibility,
    playlist.currentSortBy,
    playlist.sortType
  ]);

  if (isLoading) return <CustomGridLoader />;

  return (
    <div>
      <Divider className="my-5 " />
      <div >
        {data.data.length === 0 ? (
          <div className="flex-center justify-center flex-col w-full mt-10">
            <Frown size={25} />
            <p>There is no result found :(</p>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-10 pb-20">
            <PlayListCardListInfiniteSection initialPlaylists={data.data} />
          </div>
        )}
      </div>
    </div>
  );
}
