import { fetchAllSong } from "@/lib/axios/fetch/song/fetch-song-by-user";
import { useAppSelector } from "@/redux/store";
import { songTypeArray } from "@/types/enum/song-type";
import {
  Input,
  Pagination,
  Select,
  SelectItem,
  Tab,
  Tabs,
} from "@nextui-org/react";
import React from "react";
import { useQuery } from "react-query";
import CheckboxAssignSong from "./checkbox-assign-song";
import { LIMIT_FETCH_ASSIGN_SONG } from "@/constant/config";
import CustomGridLoader from "@/components/ui-component/custom-grid-loader";
import usePagination from "@/custom-hooks/use-pagination";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function DisplayAssignSongSection() {
  const { page, setPage } = usePagination();
  const [selected, setSelected] = React.useState<any>("all");
  console.log(selected);
  const [searchName, setSearchName] = React.useState("");
  const [type, setType] = React.useState("");
  const { data, isFetched, isLoading, error, refetch } = useQuery({
    queryKey: "fetchGetAllPlayListSongToPlaylist",
    queryFn: () =>
      fetchAllSong(
        page,
        LIMIT_FETCH_ASSIGN_SONG,
        searchName,
        type,
        "",
        selected
      ),
  });

  const songLists = useAppSelector(
    (state) => state.playlistPlayerReducer.songLists
  );

  const arrayOfIdSongLists = songLists.map((song) => song.songID);

  React.useEffect(() => {
    refetch();
  }, [page, refetch, searchName, type, selected]);

  return (
    <div>
      <div className="flex gap-3 items-center mb-4 ">
        <Input
          onChange={(e) => {
            setSearchName(e.target.value);
            setPage(1);
          }}
          size="sm"
          placeholder="Search song name"
        />
        <Select
          size="sm"
          onChange={(e) => {
            setType(e.target.value);
            setPage(1);
          }}
          placeholder="Sort by type"
        >
          {songTypeArray.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div>
        <Tabs
          selectedKey={selected}
          onSelectionChange={setSelected}
          variant="underlined"
        >
          <Tab key="all" title="All" />
          <Tab key="mySong" title="My Song" />
        </Tabs>
      </div>
      {isLoading && <CustomGridLoader size={17} />}
      {!!data?.totalCount ? (
        <>
          <div className="overflow-y-auto h-[300px] mt-3">
            {data?.songs.map((song) => (
              <CheckboxAssignSong
                song={song}
                isActive={arrayOfIdSongLists.includes(song.id)}
                key={song.id}
              />
            ))}
          </div>
          <div className="flex-center w-full  mt-4">
            <Pagination
              total={Math.ceil(data.totalCount / LIMIT_FETCH_ASSIGN_SONG)}
              showShadow
              onChange={(page) => setPage(page)}
              showControls
              page={page}
            />
          </div>
        </>
      ) : (
        <div className="mt-5 text-slate-500">No song found :((</div>
      )}
    </div>
  );
}
