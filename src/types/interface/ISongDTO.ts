import SONG_TYPE from "../enum/song-type";
import IUser from "./IUser";

export interface ISongDto {
  songName: string;
  songFileName?: string;
  songURL?: string;
  size?: number;
  extension?: string;
  type?: SONG_TYPE;
  imgURL?: string;
  author?: string;
  imgFileName?: string;
  likes?: number;
  dislikes?: number;
  visibility?: boolean;
}



export interface ISong extends ISongDto {
  id: number;
  createAt: string;
  updateAt: string;
  listenTimes: number;
  userID: number;
  user?: IUser;
}
