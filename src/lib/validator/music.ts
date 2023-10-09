import {
  ALLOWED_IMG_UPLOAD_TYPE,
  ALLOWED_SONG_UPLOAD_TYPE,
  FILE_UPLOAD_MAX_SIZE,
  SONG_UPLOAD_MAX_SIZE,
} from "@/constant/config";
import SONG_TYPE, { songTypeArray } from "@/types/enum/song-type";
import { z } from "zod";

export const MusicPostValidator = z.object({
  songName: z
    .string()
    .max(100, { message: "Song name can't be longer than 100 lengths" })
    .min(2, { message: "Song name can't be smaller than 2 lengths" }),
  author: z
    .string()
    .max(100, { message: "Author name can't be longer than 100 lengths" })
    .min(2, { message: "Author name can't be smaller than 2 lengths" })
    .nullish()
    .optional(),
  songFile: z
    .any()
    .refine(
      (file) => file[0]?.size <= SONG_UPLOAD_MAX_SIZE,
      `Max song file size is 22MB.`
    )
    .refine(
      (file) => ALLOWED_SONG_UPLOAD_TYPE.includes(file[0]?.type),
      "Only .mp3, .wav, basic and midx formats are supported."
    ),
  imgFile: z

    .any()
    .refine(
      (file) => file[0]?.size <= FILE_UPLOAD_MAX_SIZE,
      `Max image size is 8MB.`
    )
    .refine(
      (file) => ALLOWED_IMG_UPLOAD_TYPE.includes(file[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .nullish(),
  visibility: z.boolean(),
  type: z.string().optional(),
});

export type MusicPostValidatorType = z.infer<typeof MusicPostValidator>;
