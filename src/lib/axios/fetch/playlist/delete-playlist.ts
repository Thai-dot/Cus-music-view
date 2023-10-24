import axiosAuthInstance from "../../auth-instance";

export const deletePlaylists = async (ids: number[]) => {
  const { data } = await axiosAuthInstance.delete("/play-list/delete", {
    data: [...ids],
  });

  return data;
};

export const unassingedSongFromPlaylist = async (
  playlistID: number,
  songIDS: number[]
) => {
  const { data } = await axiosAuthInstance.delete(
    `/play-list/unassigned-song/${playlistID}`,
    {
      data: [...songIDS],
    }
  );
};
