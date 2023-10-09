import { UpdateUserValidatorType } from "@/lib/validator/update-user";
import axiosAuthInstance from "../../auth-instance";

export const fetchUpdateUser = async (reqData: UpdateUserValidatorType) => {
  return await axiosAuthInstance.patch("/user/edit", {
    ...reqData,
  });
};
