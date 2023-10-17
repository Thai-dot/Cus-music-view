"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Progress } from "@nextui-org/react";
import ReactPlayer from "react-player";
import {
  PauseCircle,
  PlayCircle,
  Repeat,
  Repeat1,
  RotateCcw,
  Volume1,
  Volume2,
  VolumeX,
  XCircle,
} from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { SPEED_ARRAY } from "@/constant/config";
import { cn } from "@/lib/utils";
import { ISong } from "@/types/interface/ISongDTO";
import formatTime from "@/utils/formatTimePlayer";

interface MusicPlayerProps {
  isOpenPlayer?: boolean;
  song?: ISong;
  onClose?: (e?: any) => any;
}

function MusicPlayer({ isOpenPlayer, song, onClose }: MusicPlayerProps) {
  const [isOpen, setIsOpen] = useState(isOpenPlayer);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [repeatMode, setRepeatMode] = useState<0 | 1 | 2>(0);
  const [timesRepeat, setTimesRepeat] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(50);
  const [isOpenVolume, setIsOpenVolume] = useState(false);

  // const togglePlay = () => {
  //   if (audioRef.current) {
  //     if (isPlaying) {
  //       audioRef?.current.pause();
  //     } else {
  //       if (repeatMode === 2 && timesRepeat !== 0) {
  //         setTimesRepeat(0);
  //       }
  //       audioRef?.current.play();
  //       audioRef.current.playbackRate = speed;
  //     }
  //     setIsPlaying(!isPlaying);
  //   }
  // };

  const togglePlay = React.useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        if (repeatMode === 2 && timesRepeat !== 0) {
          setTimesRepeat(0);
        }
        audioRef.current.play();
        audioRef.current.playbackRate = speed;
      }
      setIsPlaying(!isPlaying);
    }
  }, [audioRef, isPlaying, repeatMode, timesRepeat, speed]);

  // const onVolume = (e: React.ChangeEvent<HTMLInputElement> | number) => {
  //   const audioElement = audioRef.current;
  //   if (audioElement) {
  //     if (typeof e === "number") {
  //       const getVolume = e / 100;
  //       setVolume(e);
  //       audioElement.volume = getVolume;
  //     } else {
  //       const getVolume = Number(e.target.value) / 100;
  //       setVolume(Number(e.target.value));
  //       audioElement.volume = getVolume;
  //     }
  //   }
  // };

  const onVolume = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | number) => {
      const audioElement = audioRef.current;
      if (audioElement) {
        const getVolume =
          typeof e === "number" ? e / 100 : Number(e.target.value) / 100;
        setVolume(getVolume * 100);
        audioElement.volume = getVolume;
      }
    },
    [audioRef]
  );

  React.useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.playbackRate = speed;

      audioElement.addEventListener("timeupdate", () => {
        setCurrentTime(audioElement.currentTime);
      });

      setDuration(audioElement.duration);
      audioElement.addEventListener("loadedmetadata", () => {
        setDuration(audioElement.duration);
      });

      if (currentTime === duration) {
        if (repeatMode === 1) {
          setIsPlaying(true);
          audioElement.play();
        } else if (repeatMode === 2 && timesRepeat === 0) {
          setIsPlaying(true);
          audioElement.play();
          setTimesRepeat((state) => state + 1);
        } else {
          setIsPlaying(false);
        }
      }

      return () => {
        audioElement.removeEventListener("timeupdate", () => {
          setCurrentTime(audioElement.currentTime);
        });
        audioElement.removeEventListener("loadedmetadata", () => {
          setDuration(0);
        });
      };
    }
  }, [currentTime, duration, repeatMode, timesRepeat, speed, song]);

  React.useEffect(() => {
    setIsPlaying(false);
    if (!isOpen && isOpenPlayer) {
      setIsOpen(isOpenPlayer);
    }
  }, [isOpenPlayer, isOpen, song]);

  const reset = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    setCurrentTime(0);
  };

  const seek = (event: any) => {
    const audioElement = audioRef.current;
    const progressBar = event.currentTarget;
    const clickPosition =
      event.clientX - progressBar.getBoundingClientRect().left;
    const barWidth = progressBar.clientWidth;

    const seekTime = (clickPosition / barWidth) * duration;

    if (audioElement) {
      audioElement.currentTime = seekTime;
    }

    if (!isPlaying) {
      setIsPlaying(true);
      audioElement?.play();
    }
  };

  const onChangeRepeatMode = (mode: 0 | 1 | 2) => {
    setRepeatMode(mode);
  };

  const onClosePlayer = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsOpen(false);
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.pause();
    }
    if (typeof onClose === "function") {
      onClose(e);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full  z-50">
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: isOpen ? "0%" : "100%" }}
        transition={{ duration: 0.3 }}
        className="bg-slate-100 text-white shadow-lg shadow-slate-500  p-5"
      >
        <audio ref={audioRef} src={song?.songURL}></audio>
        <div>
          <div
            className=" poi absolute top-1 md:right-4 right-1 text-red-500"
            onClick={onClosePlayer}
          >
            <XCircle />
          </div>
          <div className="flex-center justify-center gap-6 md:pl-16 sm:pl-20 pl-4 pt-2 ">
            <div className="w-4 mr-2">
              <Dropdown className="outline-none border-none focus-within:border-none focus:border-none focus-visible:border-none  focus-within:outline-none focus:outline-none focus-visible:outline-none ">
                <DropdownTrigger className="outline-none border-none focus-within:border-none focus:border-none focus-visible:border-none  focus-within:outline-none focus:outline-none focus-visible:outline-none ">
                  <button className="text-slate-700">{`x${speed}`}</button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="speed controls"
                  className=" h-32 overflow-auto"
                >
                  {SPEED_ARRAY.map((speed) => (
                    <DropdownItem
                      key={speed}
                      onClick={() => {
                        setSpeed(speed);
                      }}
                    >
                      {speed}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
            <button>
              {repeatMode === 0 ? (
                <Repeat
                  onClick={() => onChangeRepeatMode(1)}
                  className="text-slate-700"
                />
              ) : repeatMode === 1 ? (
                <Repeat
                  onClick={() => onChangeRepeatMode(2)}
                  className="text-green-500"
                />
              ) : (
                <Repeat1
                  onClick={() => onChangeRepeatMode(0)}
                  className="text-green-500"
                />
              )}
            </button>
            <button onClick={togglePlay}>
              {isPlaying ? (
                <PauseCircle className="text-slate-600 scale-150" />
              ) : (
                <PlayCircle className="text-slate-600 scale-150" />
              )}
            </button>
            <button onClick={reset}>
              <RotateCcw className="text-slate-700" />
            </button>
            <div
              className={cn("flex-center gap-2")}
              onMouseEnter={() => setIsOpenVolume(true)}
              onMouseLeave={() => setIsOpenVolume(false)}
            >
              {volume === 0 ? (
                <VolumeX
                  onClick={() => onVolume(50)}
                  className="text-slate-700 poi"
                />
              ) : volume < 50 ? (
                <Volume1
                  onClick={() => onVolume(0)}
                  className="text-slate-700 poi"
                />
              ) : (
                <Volume2
                  onClick={() => onVolume(0)}
                  className="text-slate-700 poi"
                />
              )}

              <motion.input
                type="range"
                initial={{ opacity: 0 }}
                layout
                style={{
                  width: isOpenVolume ? "50%" : "0%",
                  opacity: isOpenVolume ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                min={0}
                max={100}
                onChange={(e) => onVolume(e)}
                value={volume}
                className="poi"
              />
            </div>
          </div>

          <div className="flex flex-col mt-3 gap-1">
            <Progress
              aria-label="Music progress"
              classNames={{
                indicator: "bg-default-800 dark:bg-white",
                track: "bg-default-500/30 poi",
              }}
              onClick={seek}
              color="default"
              size="sm"
              value={(currentTime / duration) * 100}
              minValue={0}
              maxValue={100}
            />

            <div className="flex justify-between">
              <p className="text-small text-foreground/50">
                {formatTime(currentTime)}
              </p>
              <p className="text-small text-foreground/50">
                {" "}
                {formatTime(duration)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default MusicPlayer;
