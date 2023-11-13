import { ISong } from "@/types/interface/ISongDTO";
import axiosAuthInstance from "../../auth-instance";

export const fetchAllSong = async (
  page = 1,
  limit = 5,
  songName = "",
  type = "",
  visibility: boolean | "",
  showMySong: "all" | "mySong"
): Promise<{
  totalCount: number;
  songs: ISong[];
}> => {
  const { data } = await axiosAuthInstance.get(
    "/song/all?" +
      (!!type ? `type=${type}&` : "") +
      (!!songName ? `songName=${songName}&` : "") +
      (visibility !== "" ? `visibility=${visibility}` : "") +
      (showMySong === "all" ? `showMySong=${false}` : `showMySong=${true}`),
    {
      params: {
        page,
        limit,
      },
    }
  );
  return data;
};

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
      (visibility !== "" ? `visibility=${visibility}` : ""),
    {
      params: {
        page,
        limit,
      },
    }
  );

  return data;
};
