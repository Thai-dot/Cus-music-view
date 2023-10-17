import { ISongDto } from "@/types/interface/ISongDTO";
import axiosAuthInstance from "../../auth-instance";

export const deleteSongs = async (ids: number[]) => {
  const { data } = await axiosAuthInstance.delete("/song/delete", {
    data: [...ids]
  });

  return data;
};

export const fetchUpdateSong = async (id: number, reqData: ISongDto) => {
  const { data } = await axiosAuthInstance.patch(`/song/update/${id}`, reqData);

  return data;
};
