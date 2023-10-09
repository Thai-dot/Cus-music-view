import { ISongDto } from "@/types/interface/ISongDTO";
import axiosAuthInstance from "../../auth-instance";

export const fetchAddNewSong = async (reqData:ISongDto) => {
  const { data } = await axiosAuthInstance.post("/song/create", reqData);

  return data;
};
