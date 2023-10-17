import { ISongDto } from "@/types/interface/ISongDTO";
import axiosAuthInstance from "../../auth-instance";

export const fetchSongByUser = async (
  page = 1,
  limit = 5,
  songName = "",
  type = "",
  visibility: boolean | ""
) => {
  const { data } = await axiosAuthInstance.get(
    "/song/get-all?" +
      (!!type ? `type=${type}&` : "") +
      (!!songName ? `songName=${songName}&` : "") +
      (visibility !=="" ? `visibility=${visibility}` : ""),
    {
      params: {
        page,
        limit,
      },
    }
  );

  return data;
};
