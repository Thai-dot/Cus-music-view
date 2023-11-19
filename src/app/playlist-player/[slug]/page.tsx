"use client";

import DisplaySongs from "@/components/playlist-player/display-songs";
import HeaderPlayer from "@/components/playlist-player/header-player";
import SongBar from "@/components/playlist-player/song-bar";
import CustomGridLoader from "@/components/ui-component/custom-grid-loader";
import MusicPlayer from "@/components/user/music/music-player";
import { fetchSinglePlaylist } from "@/lib/axios/fetch/playlist/get-playlist";
import { setCurrentPlaylist } from "@/redux/slice/playlist-player";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { IQueryError } from "@/types/interface/IError";
import { IExtendPlaylist } from "@/types/interface/IPlayList";
import { Frown } from "lucide-react";
import { notFound, useRouter } from "next/navigation";

import React from "react";
import { useQuery } from "react-query";

export default function PlaylistPlayerPage({
  params,
}: {
  params: { slug: number };
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentPlaylist, currentPlayedSong } = useAppSelector(
    (state) => state.playlistPlayerReducer
  );
  const { data, isLoading, isError, refetch, error } = useQuery<
    IExtendPlaylist,
    IQueryError
  >({
    queryKey: "fetchSinglePlaylist",
    queryFn: () => fetchSinglePlaylist(params.slug),
    onError: () => {
      router.push("/");
    },
    onSuccess: (data) => {
      if (data) {
        dispatch(setCurrentPlaylist(data));
      }
    },
  });

  React.useEffect(() => {
    refetch();
  }, [refetch, currentPlaylist]);

  const sortedArray = React.useMemo(() => {
    if (data?.song) {
      return [...data?.song].sort((a, b) => a.order - b.order);
    }
    return [];
  }, [data?.song]);

  if (error?.message) return notFound();

  return (
    <div>
      {data && (
        <>
          <HeaderPlayer playlist={data} />
          <MusicPlayer
            className="rounded-lg "
            disableCloseButton
            song={currentPlayedSong}
            isPlaylistMode
            isOpenPlayer={true}
          />
        </>
      )}

      {isError && (
        <div className="text-danger">Failed to fetch playlist and music</div>
      )}
      {isLoading ? (
        <div>
          <CustomGridLoader />
        </div>
      ) : (
        <div
          className="lg:px-32 md:px-16 px-4 bg-slate-800   py-4 pb-4 z-[5000]"
          style={{
            background: "",
          }}
        >
          {data?.song?.length === 0 ? (
            <div className="flex-center justify-center flex-col w-full mt-5 h-full min-h-[250px]">
              <Frown size={25} className="text-slate-50" />
              <p className="text-slate-50 font-semibold">
                There is no song found :(
              </p>
            </div>
          ) : (
            <DisplaySongs
              songs={sortedArray?.map((song) => song.Song)}
              playlistID={data?.id}
              refetch={refetch}
              playlist={data}
            />
          )}
        </div>
      )}
    </div>
  );
}
