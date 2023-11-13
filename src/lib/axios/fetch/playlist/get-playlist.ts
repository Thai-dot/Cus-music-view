import { IExtendPlaylist } from "@/types/interface/IPlayList";
import axiosAuthInstance from "../../auth-instance";

export const fetchPlayListByUser = async (
  page = 1,
  limit = 5,
  searchName = "",
  type = "",
  visibility: boolean | "",
  sortBy: "name" | "type" | "",
  sortType = ""
) => {
  const { data } = await axiosAuthInstance.get(
    "play-list/get?" +
      (!!type ? `type=${type}&` : "") +
      (searchName !== "" ? `searchName=${searchName}&` : "") +
      (visibility !== "" ? `visibility=${visibility}&` : "") +
      (sortBy !== "" ? `sortBy=${sortBy}&` : "") +
      (sortType !== "" ? `sortType=${sortType}` : ""),
    {
      params: {
        page,
        limit,
      },
    }
  );

  return data;
};

export const fetchAllPlaylist = async (
  page = 1,
  limit = 5,
  searchName = "",
  type = "",
  visibility: boolean | "",
  sortBy: "name" | "type" | "",
  sortType = ""
) => {
  const { data } = await axiosAuthInstance.get(
    "play-list/get-all?" +
      (!!type ? `type=${type}&` : "") +
      (searchName !== "" ? `searchName=${searchName}&` : "") +
      (visibility !== "" ? `visibility=${visibility}&` : "") +
      (sortBy !== "" ? `sortBy=${sortBy}&` : "") +
      (sortType !== "" ? `sortType=${sortType}` : ""),
    {
      params: {
        page,
        limit,
      },
    }
  );

  return data; 
};

export const fetchSinglePlaylist = async (
  id: number
): Promise<IExtendPlaylist> => {
  const { data } = await axiosAuthInstance.get(`play-list/get/${id}`);

  return data;
};
