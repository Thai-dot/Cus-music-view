import axiosAuthInstance from "../../auth-instance";
import { IPlayListDTO } from "@/types/interface/IPlayList";

export const fetchAddPlayListSong = async (reqData: IPlayListDTO) => {
  const { data } = await axiosAuthInstance.post("play-list/create", reqData);

  return data;
};

export const fetchUpdatePlayList = async (
  id: number,
  reqData: IPlayListDTO
) => {
  const { data } = await axiosAuthInstance.patch(
    `/play-list/update/${id}`,
    reqData
  );

  return data;
};

export const fetchAssignSongToPlayList = async (
  playlistID: number,
  songIDS: number[]
) => {
  const { data } = await axiosAuthInstance.patch(
    `/play-list/assign-song/${playlistID}`,
    {
      data: [...songIDS],
    }
  );

  return data;
};
