import { ISongDto } from "@/types/interface/ISongDTO";
import axiosAuthInstance from "../../auth-instance";

export const fetchAddNewSong = async (reqData: ISongDto) => {
  const { data } = await axiosAuthInstance.post("/song/create", reqData);

  return data;
};

export const fetchUpdateSong = async (id: number, reqData: ISongDto) => {
  const { data } = await axiosAuthInstance.patch(`/song/update/${id}`, reqData);

  return data;
};
