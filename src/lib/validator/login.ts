import { z } from "zod";

export const LoginValidator = z.object({
  email: z
    .string()
    .email()
    .max(180, { message: "Email can't be longer than 120 lengths" })
    .min(4, { message: "Email can't be shorter than 4 lengths" }),
  password: z
    .string()
    .max(32, { message: "Password can't be longer than 120 lengths" })
    .min(4, { message: "Password can't be shorter than 4 lengths" }),
});

export type LoginValidatorType = z.infer<typeof LoginValidator>;
