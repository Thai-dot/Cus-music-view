"use client";

import SONG_TYPE from "@/types/enum/song-type";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Search } from "lucide-react";
import React from "react";
import AddMusicSection from "./add-music-section";
import { setSortSong } from "@/redux/slice/song";
import { useAppDispatch } from "@/redux/store";


export default function SortMusicSection() {
  const dispatch = useAppDispatch();
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
          <Select label="Type Sort" size="sm" className=" w-36 ">
            {songTypeMap.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </Select>

          <div>
            <AddMusicSection />
          </div>
        </div>
      </div>
    </div>
  );
}
