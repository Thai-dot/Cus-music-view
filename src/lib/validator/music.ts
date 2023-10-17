import {
  ALLOWED_IMG_UPLOAD_TYPE,
  ALLOWED_SONG_UPLOAD_TYPE,
  FILE_UPLOAD_MAX_SIZE,
  SONG_UPLOAD_MAX_SIZE,
} from "@/constant/config";
import SONG_TYPE, { songTypeArray } from "@/types/enum/song-type";
import { File } from "buffer";
import { z } from "zod";

export const AddMusicValidator = z.object({
  songName: z
    .string()
    .max(100, { message: "Song name can't be longer than 100 lengths" })
    .min(2, { message: "Song name can't be smaller than 2 lengths" }),
  author: z
    .string()
    .max(100, { message: "Author name can't be longer than 100 lengths" })
    .min(2, { message: "Author name can't be smaller than 2 lengths" })
    .nullish()
    .optional()
    .or(z.literal("")),
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
    .nullish(),

  visibility: z.boolean(),
  type: z.string().optional(),
});

export const UpdateMusicValidator = z.object({
  songName: z
    .string()
    .max(100, { message: "Song name can't be longer than 100 lengths" })
    .min(2, { message: "Song name can't be smaller than 2 lengths" }),
  author: z
    .string()
    .max(100, { message: "Author name can't be longer than 100 lengths" })
    .min(2, { message: "Author name can't be smaller than 2 lengths" })
    .nullish()
    .optional()
    .or(z.literal("")),
  imgFile: z
    .any()
    .nullish(),
  visibility: z.boolean(),
  type: z.string().optional(),
});

export type AddMusicValidatorType = z.infer<typeof AddMusicValidator>;
export type UpdateMusicValidatorType = z.infer<typeof UpdateMusicValidator>;
