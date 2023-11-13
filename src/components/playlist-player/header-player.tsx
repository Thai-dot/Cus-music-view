import { IExtendPlaylist } from "@/types/interface/IPlayList";
import { Image } from "@nextui-org/react";
import React from "react";
import Color from "color-thief-react";
import { cn } from "@/lib/utils";
import invertColor, { invertHex } from "@/utils/invert-color";
import { Dot, Music2, UserCircle2 } from "lucide-react";
import ControlSection from "./control-section";
import { useAppSelector } from "@/redux/store";

export default function HeaderPlayer({
  playlist,
}: {
  playlist: IExtendPlaylist;
}) {
  const { currentPlaylist } = useAppSelector(
    (state) => state.playlistPlayerReducer
  );
  return (
    <div>
      <Color
        src={
          !!playlist.imgURL
            ? playlist.imgURL
            : "/image/play-list-card-image.png"
        }
        crossOrigin="anonymous"
        format="hex"
      >
        {({ data, loading }) => {
          if (loading) return null;
          if (!!data) {
            return (
              <div className="relative">
                <div
                  className={`flex md:gap-10 gap-5 lg:px-32 md:px-24 sm:px-10 px-5 lg:pt-24 md:pt-16 sm:pt-10 pt-7  pb-6  `}
                  style={{ background: data }}
                >
                  <div className="bg-add-absolute bg-noise"></div>
                  <div className=" ">
                    <Image
                      className="w-[182px] h-[182px]  object-cover object-center shadow-2xl drop-shadow"
                      src={
                        !!playlist.imgURL
                          ? playlist.imgURL
                          : "/image/play-list-card-image.png"
                      }
                      alt={playlist.name}
                    />
                  </div>
                  <div className="flex flex-col justify-end gap-5">
                    <h1
                      className={
                        "font-bold capitalize  z-10 drop-shadow-md text-white dark:text-white  "
                      }
                    >
                      {playlist.name}
                    </h1>
                    <div className=" ml-1 flex-center gap-2 z-10 font-semibold drop-shadow-md text-white dark:text-white">
                      <Music2 />
                      {!!currentPlaylist && (
                        <div className="mt-1">{`${
                          currentPlaylist?.song?.length
                        } ${
                          currentPlaylist?.song?.length > 1 ? "songs" : "song"
                        }`}</div>
                      )}

                      <div className="z-10 font-semibold drop-shadow-md text-white dark:text-white flex-center">
                        <Dot className="mt-1" />

                        <div className="mt-1">{`TYPE ${playlist.type}`}</div>
                      </div>
                    </div>
                    <div className="flex-center gap-5">
                      <div className=" z-10 gap-2 italic font-semibold drop-shadow-md text-white dark:text-white flex-center">
                        <UserCircle2 />
                        <div>
                          {`created by ${playlist?.user?.firstname} ${playlist?.user?.lastName}`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ControlSection style={{ background: data }} />
              </div>
            );
          }
        }}
      </Color>
    </div>
  );
}
