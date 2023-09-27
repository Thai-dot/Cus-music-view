import { z } from "zod";

export const SignUpValidator = z.object({
  email: z
    .string()
    .email()
    .max(180, { message: "Email can't be longer than 120 lengths" })
    .min(3, { message: "Email can't be shorter than 3 lengths" }),
  password: z
    .string()
    .max(32, { message: "Password can't be longer than 120 lengths" })
    .min(4, { message: "Password can't be shorter than 4 lengths" }),
  firstname: z
    .string()
    .max(20, { message: "First name can't be longer than 20 lengths" }),
  lastName: z
    .string()
    .max(20, { message: "Last name can't be longer than 20 lengths" }),
});

export type SignUpValidatorType = z.infer<typeof SignUpValidator>;
