import axiosAuthInstance from "../../auth-instance";


export type reorderArrayType = {
  songID: number;
  order:number;
};
export const reorderSongInPlaylist = async (
  playlistID: number,
  reorderArray: reorderArrayType[]
) => {
  const { data } = await axiosAuthInstance.patch(
    `/play-list/reorder/${playlistID}`,
    [...reorderArray]
  );
  return data;
};



