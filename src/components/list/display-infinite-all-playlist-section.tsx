import React from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { IQueryError } from "@/types/interface/IError";
import { INFINITE_SCROLL_PAGINATION_PLAYLIST_LIMIT } from "@/constant/config";
import { useIntersectionObserver } from "@/custom-hooks/use-intersection-observer";
import { HashLoader } from "react-spinners";
import { useAppSelector } from "@/redux/store";
import { fetchAllPlaylist, fetchPlayListByUser } from "@/lib/axios/fetch/playlist/get-playlist";
import PlaylistTypeCard from "./playlist-type-card";

export default function DisplayAllPlaylistInfiniteSection({
  initialPlaylists,
}: {
  initialPlaylists: any;
}) {
  const lastPlaylistRef = React.useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(lastPlaylistRef, {
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
    "all-playlist-infinite",
    async ({ pageParam = 1 }) => {
      const { data } = await fetchAllPlaylist(
        pageParam,
        INFINITE_SCROLL_PAGINATION_PLAYLIST_LIMIT,
        playlist.searchName,
        playlist.type,
        "",
        "",
        undefined,
        ""
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
              className=" lg:col-span-3 md:col-span-4 col-span-12"
              key={item._id}
              ref={lastPlaylistRef}
            >
              <PlaylistTypeCard playlist={item._source} />
            </div>
          );
        }
        return (
          <div
            className=" lg:col-span-3 md:col-span-4 col-span-12"
            key={item._id}
          >
            <PlaylistTypeCard playlist={item._source} />
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
