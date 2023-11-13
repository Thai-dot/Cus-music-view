"use client";

import { toggleAssignSong } from "@/lib/axios/fetch/playlist/assign-song-to-playlist";
import { fetchSinglePlaylist } from "@/lib/axios/fetch/playlist/get-playlist";
import { setCurrentPlaylist } from "@/redux/slice/playlist-player";
import { useAppDispatch } from "@/redux/store";
import { ISong } from "@/types/interface/ISongDTO";
import { Checkbox } from "@nextui-org/react";
import { useParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface CheckboxAssignSongProps {
  song: ISong;
  isActive?: boolean;
}

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function CheckboxAssignSong({
  song,
  isActive,
}: CheckboxAssignSongProps) {
  const [isSelected, setIsSelected] = React.useState(isActive);
  const dispatch = useAppDispatch();
  const params = useParams();
  const playlistID = Number(params.slug);

  const handleToggleAssignSong = async (value: boolean) => {
    try {
      await toggleAssignSong(value, playlistID, [song.id]);

      const newPlaylist = await fetchSinglePlaylist(playlistID);
      dispatch(setCurrentPlaylist(newPlaylist));

      if (value) {
        toast.success("Assigned song to playlist successfully", {
          duration: 1000,
        });
      } else {
        toast.success("Unassigned song to playlist successfully", {
          duration: 1000,
        });
      }
    } catch (error) {
      toast.error("Failed to assign song to playlist", {
        duration: 2000,
      });
    }
  };
  return (
    <div>
      <Checkbox
        isSelected={isSelected}
        onValueChange={async (value) => {
          setIsSelected(value);
          await handleToggleAssignSong(value);
        }}
        className="w-full hover:bg-slate-300  px-4 mt-3"
        classNames={{ label: "flex-center h-[50px] w-[500px] " }}
      >
        <div className="flex-center w-full justify-between gap-3 ">
          <div className="font-bold ">{song.songName}</div>
          <div className="text-slate-400">{song.author}</div>
        </div>
      </Checkbox>
    </div>
  );
}
