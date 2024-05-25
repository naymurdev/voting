import { z } from "zod";
import { countries } from "../../constants";

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number(),
  password: z.string(),
  country: z.enum(countries),
  voted: z
    .object({
      vote: z.boolean(),
      partyName: z.string(),
      candidateName: z.string(),
    })
    .optional(),
});

export const loginSchema = z.object({
  userIdendity: z.string(),
  password: z.string(),
});
