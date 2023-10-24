import PLAY_LIST_TYPE from "../enum/playlist-type";

export interface IPlayListDTO {
  name: string;

  type?: PLAY_LIST_TYPE;

  visibility?: boolean;

  imgURL?: string;

  imgName?: string;
}

export interface IPlayList extends IPlayListDTO {
  id: number;
  createAt?: string;
  updateAt?: string;
  userID: number;
}
