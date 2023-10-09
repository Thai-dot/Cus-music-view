import { ISong } from "@/types/interface/ISongDTO";
import React from "react";
import { useInfiniteQuery } from "react-query";
import { fetchSongByUser } from "@/lib/axios/fetch/song/fetch-song-by-user";
import { IQueryError } from "@/types/interface/IError";
import MusicCard from "./music-card";
import { INFINITE_SCROLL_PAGINATION_SONG_LIMIT } from "@/constant/config";
import { useIntersectionObserver } from "@/custom-hooks/use-intersection-observer";
import { HashLoader } from "react-spinners";

export default function MusicCardListInfiniteSection({
  initialSongs,
}: {
  initialSongs: any;
}) {
  const lastSongRef = React.useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(lastSongRef, {
    threshold: 1,
  });

  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<any, IQueryError>(
    "song-user",
    async ({ pageParam = 1 }) => {
      const { data } = await fetchSongByUser(
        pageParam,
        INFINITE_SCROLL_PAGINATION_SONG_LIMIT
      );
      return data;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialSongs], pageParams: [1] },
    }
  );

  React.useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage(); // Load more posts when the last post comes into view
    }
  }, [entry, fetchNextPage]);

 

  const songs = data?.pages.flatMap((page) => page) ?? initialSongs;

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      {songs.map((item: any, index: number) => {
        if (index === songs.length - 1) {
          return (
            <div
              className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12"
              key={item._id}
              ref={lastSongRef}
            >
              <MusicCard song={item._source} />
            </div>
          );
        }
        return (
          <div
            className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12"
            key={item._id}
          >
            <MusicCard song={item._source} />
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
