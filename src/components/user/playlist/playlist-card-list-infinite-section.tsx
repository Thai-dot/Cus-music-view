import React from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { IQueryError } from "@/types/interface/IError";
import PlayListCard from "./playlist-card";
import { INFINITE_SCROLL_PAGINATION_PLAYLIST_LIMIT } from "@/constant/config";
import { useIntersectionObserver } from "@/custom-hooks/use-intersection-observer";
import { HashLoader } from "react-spinners";
import { useAppSelector } from "@/redux/store";
import { fetchPlayListByUser } from "@/lib/axios/fetch/playlist/get-playlist";

export default function PlayListCardListInfiniteSection({
  initialPlaylists,
}: {
  initialPlaylists: any;
}) {
  const lastSongRef = React.useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(lastSongRef, {
    threshold: 1,
  });
  const playlist = useAppSelector((state) => state.playlistSliceReducer);

  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery<any, IQueryError>(
    "playlist-user-infinite",
    async ({ pageParam = 1 }) => {
      const { data } = await fetchPlayListByUser(
        pageParam,
        INFINITE_SCROLL_PAGINATION_PLAYLIST_LIMIT,
        playlist.searchName,
        playlist.type,
        playlist.visibility,
        playlist.currentSortBy,
        playlist.sortType
      );
      return data;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialPlaylists], pageParams: [1] },
    }
  );

  React.useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage(); // Load more posts when the last post comes into view
    }
  }, [entry, fetchNextPage]);

  React.useEffect(() => {
    refetch();
  }, [
    refetch,
    playlist.searchName,
    playlist.type,
    playlist.visibility,
    playlist.currentSortBy,
    playlist.sortType,
  ]);

  const playlists = data?.pages.flatMap((page) => page) ?? initialPlaylists;

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      {playlists.map((item: any, index: number) => {
        if (index === playlists.length - 1) {
          return (
            <div
              className=" sm:col-span-6 col-span-12"
              key={item._id}
              ref={lastSongRef}
            >
              <PlayListCard playlist={item._source} />
            </div>
          );
        }
        return (
          <div
            className=" sm:col-span-6 col-span-12"
            key={item._id}
          >
            <PlayListCard playlist={item._source} />
          </div>
        );
      })}
      {isFetchingNextPage && (
        <div className="flex justify-center mt-4">
          <HashLoader size={20} color="#36d7b7" />
        </div>
      )}
    </>
  );
}
