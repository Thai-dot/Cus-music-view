import axiosAuthInstance from "../../auth-instance";

export const getLovePlaylist = async (playlistID?: number) => {
  const { data } = await axiosAuthInstance.get(
    `/play-list/love/?` + (!!playlistID ? `playlistID=${playlistID}` : "")
  );
  console.log(data);
  return data;
};

export const assignLovePlaylist = async (playlistID: number) => {
  const { data } = await axiosAuthInstance.post(
    `/play-list/love/${playlistID}`
  );
  return data;
};

export const unAssignLovePlaylist = async (playlistID: number) => {
  const { data } = await axiosAuthInstance.delete(
    `/play-list/love/${playlistID}`
  );
  return data;
};
