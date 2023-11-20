import { IPlayList } from "@/types/interface/IPlayList";

import { Image } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import React from "react";

import truncateText from "@/utils/truncate-text";
import PlayListToolSection from "./tool-playlist-section";

interface PlayListCardProps {
  playlist: IPlayList;
}

export default function PlaylistCard({ playlist }: PlayListCardProps) {
  return (
    <div
      className="  w-auto my-3 p-3 grid sm:grid-cols-12 grid-cols-1  place-items-center transition origin-bottom-left hover:scale-[0.98]
       shadow-2xl rounded-lg justify-center bg-gradient-to-r from-[#eecda3] to-[#ef629f] dark:from-[#393939] dark:to-[#7e7e7e]"
    >
      <div className="sm:col-span-2 col-span-12 w-full flex justify-center">
        <Image
          src={
            !!playlist?.imgURL
              ? playlist.imgURL
              : "/image/play-list-card-image.png"
          }
          className="object-cover sm:w-[80px] sm:h-[70px] w-[180px] h-[150px]  "
          alt={playlist.name}
        />
      </div>

      <div className="sm:col-span-8 col-span-12 flex-center flex-col gap-2">
        <h4 className="text-primary-600 sm:mt-0 mt-3">
          {truncateText(playlist.name, 20)}
        </h4>
        <div className="sm:my-0 my-2">{playlist.type}</div>
      </div>
      <div className="sm:col-span-2 col-span-12 flex-center justify-center">
        <div className="flex-center gap-2">
          {playlist.visibility ? <Eye /> : <EyeOff />}

          <PlayListToolSection playlist={playlist} />
        </div>
      </div>
    </div>
  );
}
