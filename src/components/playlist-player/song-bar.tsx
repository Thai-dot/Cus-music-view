import { useRaisedShadow } from "@/custom-hooks/use-raised-box-shadow";
import { cn } from "@/lib/utils";
import { switchCurrentSong } from "@/redux/slice/playlist-player";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ISong } from "@/types/interface/ISongDTO";
import formatTime from "@/utils/formatTimePlayer";
import truncateText from "@/utils/truncate-text";
import { Image } from "@nextui-org/react";
import { Reorder, useMotionValue } from "framer-motion";
import { Play, Timer } from "lucide-react";
import React from "react";

interface ISongBarProp {
  song: ISong | null;
  index: number;
  isReorder?: boolean;
}

export default function SongBar({ song, index, isReorder }: ISongBarProp) {
  const [displayPlayButton, setDisplayPlayButton] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = React.useState(0);
  const dispatch = useAppDispatch();

  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  const { currentPlayedSong } = useAppSelector(
    (state) => state.playlistPlayerReducer
  );
  const isThisSongPlayed = currentPlayedSong?.id === song?.id;

  React.useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      setDuration(audioElement.duration);
      audioElement.addEventListener("loadedmetadata", () => {
        setDuration(audioElement.duration);
      });

      return () => {
        audioElement.removeEventListener("loadedmetadata", () => {
          setDuration(0);
        });
      };
    }
  }, [duration, song]);

  return (
    <Reorder.Item
      value={song}
      id={song?.songName ?? ""}
      style={{ boxShadow, y }}
      dragListener={isReorder}
    >
      <div
        className={cn(
          "bg-neutral-200 hover:bg-neutral-300 poi p-4 my-3  flex-center justify-between w-full rounded-lg ",
          isThisSongPlayed && "bg-neutral-300"
        )}
        onMouseMove={() => setDisplayPlayButton(true)}
        onMouseOut={() => setDisplayPlayButton(false)}
        onClick={() => {
          dispatch(switchCurrentSong(song));
        }}
      >
        <audio ref={audioRef} src={song?.songURL}></audio>

        <div className="flex-center gap-3 ">
          {displayPlayButton || isThisSongPlayed ? (
            <div>
              <Play
                className=" font-semibold "
                size={15}
                fill="white"
                stroke="white"
              />
            </div>
          ) : (
            <div className="font-semibold  ">{index}</div>
          )}
          {!!song && (
            <>
              <div className="">
                <Image
                  src={
                    !!song.imgURL
                      ? song?.imgURL
                      : "/image/hero-card-complete.jpeg"
                  }
                  alt={song?.songName}
                  className=" object-center object-fill w-[72px] h-[68px] shadow-lg"
                />
              </div>
              <div className="flex flex-wrap flex-col">
                <h5 className="font-semibold break-words ">
                  {truncateText(song?.songName, 35)}
                </h5>
                <p className=" font-medium">{song?.author}</p>
              </div>
            </>
          )}
        </div>
        <div></div>
        <div className=" font-semibold flex-center gap-1">
          <Timer />
          <div className="pt-[2px]">{formatTime(duration)}</div>
        </div>
      </div>
    </Reorder.Item>
  );
}
