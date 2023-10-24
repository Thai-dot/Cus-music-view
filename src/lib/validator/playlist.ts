import { z } from "zod";

export const AddPlaylistValidator = z.object({
  name: z
    .string()
    .max(100, { message: "Playlist name can't be longer than 100 lengths" })
    .min(2, { message: "Playlist name can't be smaller than 2 lengths" }),
  imgFile: z.any().nullish(),
  visibility: z.boolean(),
  type: z.string().optional(),
});

export const UpdatePlaylistValidator = z.object({
  name: z
    .string()
    .max(100, { message: "Playlist name can't be longer than 100 lengths" })
    .min(2, { message: "Playlist name can't be smaller than 2 lengths" }),
  imgFile: z.any().nullish(),
  visibility: z.boolean(),
  type: z.string().optional(),
});

export type AddPlaylistValidatorType = z.infer<typeof AddPlaylistValidator>;
export type UpdatePlaylistValidatorType = z.infer<
  typeof UpdatePlaylistValidator
>;
