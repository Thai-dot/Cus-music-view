import { cn } from "@/lib/utils";
import { Heart, PauseCircle, PlayCircle } from "lucide-react";
import React from "react";

import MoreSettingPlaylist from "./more-seting-playlist";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useSession } from "next-auth/react";
import { fetchMe } from "@/lib/axios/fetch/user/get-me";
import { useQuery } from "react-query";
import IUser from "@/types/interface/IUser";
import { IQueryError } from "@/types/interface/IError";
import { setIsPlayingMusic } from "@/redux/slice/playlist-player";

interface ControlSectionProp extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function ControlSection({
  className,
  ...props
}: ControlSectionProp) {
  const { currentPlaylist } = useAppSelector(
    (state) => state.playlistPlayerReducer
  );

  const { isMusicPlaying } = useAppSelector(
    (state) => state.playlistPlayerReducer
  );
  const dispatch = useAppDispatch();
  const { data } = useQuery<IUser, IQueryError>({
    queryKey: "fetchMe",
    queryFn: () => {
      return fetchMe();
    },
  });

  return (
    <div
      {...props}
      className={cn(
        " w-full lg:px-32 md:px-24 sm:px-10 px-5  py-4 pb-4 z-[10]",
        className
      )}
    >
      <div className="flex-center gap-6">
        {isMusicPlaying ? (
          <PauseCircle
            size={55}
            onClick={() => {
              dispatch(setIsPlayingMusic(false));
            }}
            className=" poi text-slate-300 hover:text-slate-50 transition hover:scale-105  z-[10] "
          />
        ) : (
          <PlayCircle
            size={55}
            onClick={() => {
              dispatch(setIsPlayingMusic(true));
            }}
            className=" poi text-slate-300 hover:text-slate-50 transition hover:scale-105  z-[10] "
          />
        )}

        <Heart
          size={40}
          className="poi text-slate-300 hover:text-slate-50 transition hover:scale-105  z-[10] "
        />
        {Number(currentPlaylist?.userID) === data?.id && (
          <div className="z-[10]">
            <MoreSettingPlaylist />
          </div>
        )}
      </div>
    </div>
  );
}
