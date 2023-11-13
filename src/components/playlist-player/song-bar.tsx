import { useRaisedShadow } from "@/custom-hooks/use-raised-box-shadow";
import { switchCurrentSong } from "@/redux/slice/playlist-player";
import { useAppDispatch } from "@/redux/store";
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
}

export default function SongBar({ song, index }: ISongBarProp) {
  const [displayPlayButton, setDisplayPlayButton] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = React.useState(0);
  const dispatch = useAppDispatch();

  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

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
    >
      <div
        className="bg-slate-600 hover:bg-slate-700 poi p-4 my-3 flex-center justify-between w-full rounded-lg "
        onMouseMove={() => setDisplayPlayButton(true)}
        onMouseOut={() => setDisplayPlayButton(false)}
        onClick={() => {
          dispatch(switchCurrentSong(song));
        }}
      >
        <audio ref={audioRef} src={song?.songURL}></audio>

        <div className="flex-center gap-3 ">
          {displayPlayButton ? (
            <div>
              <Play
                className=" font-semibold text-white"
                size={15}
                fill="white"
              />
            </div>
          ) : (
            <div className="font-semibold text-slate-300  ">{index}</div>
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
                <h5 className="font-semibold break-words text-slate-300">
                  {truncateText(song?.songName, 35)}
                </h5>
                <p className="text-slate-200 font-medium">{song?.author}</p>
              </div>
            </>
          )}
        </div>
        <div>
          
        </div>
        <div className="text-slate-200 font-semibold flex-center gap-1">
          <Timer />
          <div className="pt-[2px]">{formatTime(duration)}</div>
        </div>
      </div>
    </Reorder.Item>
  );
}
