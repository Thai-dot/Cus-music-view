"use client";

import SONG_TYPE from "@/types/enum/song-type";
import { Input, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { Eye, EyeOff, MenuSquare, Search } from "lucide-react";
import React from "react";
import AddMusicSection from "./add-music-section";
import { setSortSong } from "@/redux/slice/song";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export default function SortMusicSection() {
  const dispatch = useAppDispatch();
  const song = useAppSelector((state) => state.songSliceReducer);
  const songTypeMap = Object.values(SONG_TYPE);
  return (
    <div>
      <div className="">
        <Input
          variant="underlined"
          maxLength={150}
          startContent={<Search />}
          onChange={(e) => {
            dispatch(
              setSortSong({
                sortType: "songName",
                value: e.target.value,
              })
            );
          }}
          placeholder="Search music by name"
        />

        <div className="flex-center flex-wrap justify-between mt-5">
          <div className="flex-center gap-5">
            <Select
              onChange={(e) => {
                dispatch(
                  setSortSong({ sortType: "type", value: e.target.value })
                );
              }}
              label="Type Sort"
              size="sm"
              className=" w-36 "
            >
              {songTypeMap.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </Select>
            <Tooltip content="visibility" className="poi">
              {song.visibility === "" ? (
                <MenuSquare
                  className="poi"
                  onClick={() =>
                    dispatch(
                      setSortSong({ sortType: "visibility", value: true })
                    )
                  }
                />
              ) : song.visibility ? (
                <Eye
                  className="poi"
                  onClick={() =>
                    dispatch(
                      setSortSong({ sortType: "visibility", value: false })
                    )
                  }
                />
              ) : (
                <EyeOff
                  className="poi"
                  onClick={() =>
                    dispatch(setSortSong({ sortType: "visibility", value: "" }))
                  }
                />
              )}
            </Tooltip>
          </div>

          <div>
            <AddMusicSection />
          </div>
        </div>
      </div>
    </div>
  );
}
