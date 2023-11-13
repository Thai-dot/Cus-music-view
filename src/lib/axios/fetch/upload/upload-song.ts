import axiosAuthInstance from "../../auth-instance";

export const uploadSong = async (file: File) => {
  try {
    let formdata = new FormData();
    formdata.append("file", file, file.name);

    const { data } = await axiosAuthInstance.post(
      "/song-upload/upload",
      formdata,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteSongFile = async (name: string | undefined) => {
  try {
    await axiosAuthInstance.delete(`/song-upload/delete/${name}`);
  } catch (error) {
    console.error(error);
  }
};
