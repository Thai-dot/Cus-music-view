import {  IPlayList } from "./IPlayList";
import { ISong } from "./ISongDTO";

interface IPlayListSong {
  playListID: number;
  songID: number;
  order:number;
  createAt: string;
  updateAt: string;
}

export interface IExtendPlaylistSong extends IPlayListSong {
  Song?: ISong;
  Playlist?: IPlayList;
}

export default IPlayListSong;
