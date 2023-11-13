import IUser from "@/types/interface/IUser";
import axiosAuthInstance from "../../auth-instance";

export const fetchMe = async ():Promise<IUser> => {
  const { data } = await axiosAuthInstance.get("/user/me");

  return data;
};
