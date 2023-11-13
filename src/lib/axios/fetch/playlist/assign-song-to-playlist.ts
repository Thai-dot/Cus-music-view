import axiosAuthInstance from "../../auth-instance";

export const assignSongToPlaylist = async (
  playlistID: number,
  songIDs: number[]
) => {
  const { data } = await axiosAuthInstance.patch(
    `/play-list/assign-song/${playlistID}`,
    [...songIDs]
  );
  return data;
};

export const unAssignSongToPlaylist = async (
  playlistID: number,
  songIDs: number[]
) => {
  const { data } = await axiosAuthInstance.delete(
    `/play-list/unassigned-song/${playlistID}`,
    {
      data: [...songIDs],
    }
  );

  return data;
};

export const toggleAssignSong = async (
  valueType: boolean,
  playlistID: number,
  songIDs: number[]
) => {
  try {
    if (valueType) {
      await assignSongToPlaylist(playlistID, songIDs);
    } else {
      await unAssignSongToPlaylist(playlistID, songIDs);
    }
  } catch (error) {
    throw error;
  }
};
