// candidate.validation.ts

import { z } from "zod";

export const CandidateSchema = z.object({
  candidateName: z.string().min(1),
  candidateImgUrl: z.string().url(),
  candidateContact: z.string().min(1),
});
