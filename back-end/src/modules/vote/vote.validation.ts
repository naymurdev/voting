import { countries } from "../../constants";
import { z } from "zod";

export const voteSchema = z.object({
  partyName: z.string(),
  userId: z.string(),
});
