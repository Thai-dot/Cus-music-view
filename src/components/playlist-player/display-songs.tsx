import React from "react";
import SongBar from "./song-bar";
import { ISong } from "@/types/interface/ISongDTO";
import { Reorder } from "framer-motion";
import {
  reorderArrayType,
  reorderSongInPlaylist,
} from "@/lib/axios/fetch/playlist/reorder-song-in-playlist";
import toast from "react-hot-toast";

interface IDisplaySongsProp {
  songs: ISong[] | undefined[] | undefined | any;
  playlistID: number | undefined;
  refetch: () => any;
}

export default function DisplaySongs({
  songs,
  playlistID,
  refetch,
}: IDisplaySongsProp) {
  const [items, setItems] = React.useState<any>([]);

  React.useEffect(() => {
    setItems(songs);
  }, [songs]);

  const handleReorder = React.useCallback(
    async (orderList: any) => {
      const dtoArray: reorderArrayType[] = orderList.map(
        (item: any, index: number) => {
          return {
            songID: item.id,
            order: index + 1,
          };
        }
      );
      await reorderSongInPlaylist(playlistID ?? 0, dtoArray).then(() => {
        toast.success("Reorder successfully", { duration: 1200 });
        refetch();
      });
    },
    [playlistID, refetch]
  );

  return (
    <div className="min-h-[290px]">
      <Reorder.Group
        values={items ?? []}
        onReorder={(orderList) => {
          setItems(orderList);
          handleReorder(orderList);
        }}
      >
        {items?.map((song: ISong, index: number) => {
          return <SongBar index={index + 1} song={song} key={song?.id} />;
        })}
      </Reorder.Group>
    </div>
  );
}
