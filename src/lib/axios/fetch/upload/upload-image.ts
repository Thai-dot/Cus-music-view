import axiosAuthInstance from "../../auth-instance";

export const uploadImg = async (file: File) => {
  try {
    let formdata = new FormData();
    formdata.append("file", file, file.name);

    const { data } = await axiosAuthInstance.post(
      "/image-upload/upload",
      formdata,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
