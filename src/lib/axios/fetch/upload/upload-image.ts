import axiosAuthInstance from "../../auth-instance";

export const uploadImg = async (file: File) => {
  try {
    if(!file) return

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

export const deleteImg = async (name: string|undefined) => {
  try {
    await axiosAuthInstance.delete(`/image-upload/delete/${name}`);
  } catch (error) {
    console.log(error);
  }
};
