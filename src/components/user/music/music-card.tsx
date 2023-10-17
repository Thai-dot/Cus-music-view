import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import truncateText from "@/utils/truncate-text";
import { ISong } from "@/types/interface/ISongDTO";
import { useAppDispatch } from "@/redux/store";
import { setMusicPlayerDisplay, setMusicToPlayer } from "@/redux/slice/song";
import UpdateSongSection from "./update-music-section";

export default function MusicCard({ song }: { song: ISong }) {
  const dispatch = useAppDispatch();

  return (
    <div
      className="w-full "
      onClick={() => {
        dispatch(setMusicPlayerDisplay(true));
        dispatch(setMusicToPlayer(song));
      }}
    >
      <Card className="py-4  poi ">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start w-full">
          <div className="flex-center justify-between w-full">
            <p className="text-tiny uppercase font-bold break-words ">
              {song?.type ?? ""}
            </p>
            <div>
            <UpdateSongSection song={song} />

            </div>
          </div>
          <small className="text-default-500 break-words capitalize text-inherit">
            {truncateText(!!song?.author ? song?.author : "No artist", 18)}
          </small>
          <h5 className="font-bold  text-large break-words capitalize">
            {truncateText(song?.songName ?? "", 15)}
          </h5>
        </CardHeader>
        <CardBody className="overflow-visible flex-center justify-center py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl w-full lg:h-36 md:h-44 h-48 "
            src={!!song.imgURL ? song.imgURL : "/image/hero-card-complete.jpeg"}
          />
        </CardBody>
      </Card>
    </div>
  );
}
