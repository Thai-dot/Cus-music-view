import axiosAuthInstance from "../../auth-instance";

export const fetchMe = async () => {
  const { data } = await axiosAuthInstance.get("/user/me");

  return data;
};
