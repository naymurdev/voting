// candidates/candidate.model.ts

import mongoose, { Document, Schema } from "mongoose";
import { Candidate } from "./candidates.interface";
import { z } from "zod";

// Define Zod schema for Candidate
const candidateSchema = z.object({
  partyName: z.string().min(1, "Party name is required"),
  candidateName: z.string().min(1, "Candidate name is required"),
  candidateImgUrl: z.string().url("Invalid URL"),
  candidateContact: z.string().min(1, "Candidate contact is required"),
});

export interface CandidateDocument extends Document, Candidate {}

const CandidateSchema = new Schema<CandidateDocument>({
  partyName: { type: String, required: true },
  candidateName: { type: String, required: true },
  candidateImgUrl: { type: String, required: true },
  candidateContact: { type: String, required: true },
});

// Add pre-save hook to validate data using Zod
CandidateSchema.pre("save", function (next) {
  const candidate = this as CandidateDocument;
  const result = candidateSchema.safeParse(candidate);

  if (!result.success) {
    const error: any = new Error("Validation Error");
    error.errors = result.error.errors;
    next(error);
  } else {
    next();
  }
});

export const CandidateModel = mongoose.model<CandidateDocument>(
  "Candidate",
  CandidateSchema
);
