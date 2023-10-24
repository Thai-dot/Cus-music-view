import axiosAuthInstance from "../../auth-instance";

export const deleteSongs = async (ids: number[]) => {
  const { data } = await axiosAuthInstance.delete("/song/delete", {
    data: [...ids]
  });

  return data;
};

