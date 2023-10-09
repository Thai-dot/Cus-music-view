import { z } from "zod";

export const UpdateValidator = z.object({
  firstname: z
    .string()
    .max(20, { message: "First name can't be longer than 20 lengths" })
    .min(2, { message: "First name can't be smaller than 2 lengths" }),
  lastName: z
    .string()
    .max(20, { message: "Last name can't be longer than 20 lengths" })
    .min(2, { message: "Last name can't be smaller than 2 lengths" }),
});

export type UpdateUserValidatorType = z.infer<typeof UpdateValidator>;
