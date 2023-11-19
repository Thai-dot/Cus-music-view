"use client";

import {
  Input,
  Select,
  SelectItem,

} from "@nextui-org/react";
import {

  Search,
} from "lucide-react";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
 
  setQueryPlaylist,
 
} from "@/redux/slice/playlist";
import PLAY_LIST_TYPE from "@/types/enum/playlist-type";

export default function SortListSection() {
  const dispatch = useAppDispatch();
  const { playlistSectionType } = useAppSelector(
    (state) => state.playlistSliceReducer
  );



  interface sortMap {
    name: string;
    value: "name" | "type";
  }

  const sortMap: sortMap[] = [
    {
      name: "Name",
      value: "name",
    },

    {
      name: "Type",
      value: "type",
    },
  ];
  const playlist = useAppSelector((state) => state.playlistSliceReducer);
  const playlistTypeArray = Object.values(PLAY_LIST_TYPE);
  return (
    <div className="mt-10 mb-12">
      <div className="flex-center justify-between gap-3">
        <Input
          variant="bordered"
          maxLength={150}
          startContent={<Search />}
          className="md:w-1/2 w-full"
          classNames={{inputWrapper: "pr-0 py-[0px]"}}
          onChange={(e) => {
            dispatch(
              setQueryPlaylist({
                queryType: "searchName",
                value: e.target.value,
              })
            );
          }}
          placeholder="Search playlist by name"
          endContent={
            <Select
              onChange={(e) => {
                dispatch(
                  setQueryPlaylist({ queryType: "type", value: e.target.value })
                );
              }}
              placeholder="Playlist type"
              size="sm"
              className=" w-48 "
            >
              {playlistTypeArray.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </Select>
          }
        />
      </div>
    </div>
  );
}
