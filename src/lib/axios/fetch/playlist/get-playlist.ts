import axiosAuthInstance from "../../auth-instance";

export const fetchPlayListByUser = async (
  page = 1,
  limit = 5,
  searchName = "",
  type = "",
  visibility: boolean | "",
  sortBy: "name" | "date" | "type" | "",
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
