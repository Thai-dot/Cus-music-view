"use client";

import {
  Input,
  Select,
  SelectItem,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tabs,
  Tab,
} from "@nextui-org/react";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  Check,
  Eye,
  EyeOff,
  Filter,
  MenuSquare,
  Search,
} from "lucide-react";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import AddPlayListSection from "./add-playlist-section";
import {
  PlaylistSectionType,
  setPlaylistSectionType,
  setQueryPlaylist,
  setSortBy,
  setSortType,
} from "@/redux/slice/playlist";
import PLAY_LIST_TYPE from "@/types/enum/playlist-type";

export default function SortPlayListSection() {
  const dispatch = useAppDispatch();
  const { playlistSectionType } = useAppSelector(
    (state) => state.playlistSliceReducer
  );

  const handleVisibilityChange = (value: "" | boolean) => {
    dispatch(setQueryPlaylist({ queryType: "visibility", value }));
  };

  const handleSetSortBy = (value: any) => {
    dispatch(setSortBy(value));
  };

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
    <div>
      <div className="">
        <Input
          variant="underlined"
          maxLength={150}
          startContent={<Search />}
          onChange={(e) => {
            dispatch(
              setQueryPlaylist({
                queryType: "searchName",
                value: e.target.value,
              })
            );
          }}
          placeholder="Search playlist by name"
        />

        <div className="flex-center flex-wrap justify-between mt-5">
          <div className="flex-center gap-5">
            <Select
              onChange={(e) => {
                dispatch(
                  setQueryPlaylist({ queryType: "type", value: e.target.value })
                );
              }}
              label="Playlist type"
              size="sm"
              className=" w-36 "
            >
              {playlistTypeArray.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </Select>
            <Tooltip content="visibility" className="poi">
              {playlist.visibility === "" ? (
                <MenuSquare
                  className="poi"
                  onClick={() => handleVisibilityChange(true)}
                />
              ) : playlist.visibility ? (
                <Eye
                  className="poi"
                  onClick={() => handleVisibilityChange(false)}
                />
              ) : (
                <EyeOff
                  className="poi"
                  onClick={() => handleVisibilityChange("")}
                />
              )}
            </Tooltip>

            <Dropdown>
              <DropdownTrigger>
                <Filter className="poi" />
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                {sortMap.map((sort) => {
                  return (
                    <DropdownItem
                      endContent={
                        playlist.currentSortBy === sort.value && (
                          <Check className="text-primary" size={15} />
                        )
                      }
                      onClick={() => handleSetSortBy(sort.value)}
                      key={sort.name}
                    >
                      {sort.name}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>

            <Tooltip content="Sort type">
              {playlist.sortType === "asc" ? (
                <ArrowUpAZ
                  onClick={() => {
                    dispatch(setSortType("desc"));
                  }}
                  className="poi"
                />
              ) : (
                <ArrowDownAZ
                  className="poi"
                  onClick={() => {
                    dispatch(setSortType("asc"));
                  }}
                />
              )}
            </Tooltip>
          </div>

          <div>
            <AddPlayListSection />
          </div>
        </div>

        <div className="flex-center w-full mt-5">
          <Tabs
            selectedKey={playlistSectionType}
            onSelectionChange={(data) => {
              const convertType: any = data;
              dispatch(setPlaylistSectionType(convertType));
            }}
            variant="underlined"
          >
            <Tab key="all" title="All" />
            <Tab key="love" title="Loved Playlist" />
          </Tabs>
        </div>
      </div>
    </div>
  );
}
