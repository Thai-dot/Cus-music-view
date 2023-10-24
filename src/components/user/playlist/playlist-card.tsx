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
      className=" col-span-6 my-3 p-3 grid grid-cols-12 transition origin-bottom-left hover:scale-[0.98]
       shadow-2xl rounded-lg"
      style={{ background: "linear-gradient(to left, #eecda3, #ef629f)" }}
    >
      <div className="col-span-2">
        <Image
          src={
            !!playlist?.imgURL
              ? playlist.imgURL
              : "/image/play-list-card-image.png"
          }
          className="object-cover w-[80px] h-[70px] "
          alt={playlist.name}
        />
      </div>

      <div className="col-span-8 flex-center flex-col gap-2">
        <h4 className="text-primary-600">{truncateText(playlist.name, 20)}</h4>
        <div>{playlist.type}</div>
      </div>
      <div className="col-span-2 flex-center justify-center">
        <div className="flex-center gap-2">
          {playlist.visibility ? <Eye /> : <EyeOff />}

          <PlayListToolSection playlist={playlist} />
        </div>
      </div>
    </div>
  );
}
