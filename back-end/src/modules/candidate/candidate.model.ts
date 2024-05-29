// candidates/candidate.model.ts

import mongoose, { Document, Schema } from "mongoose";
import { Candidate } from "./candidates.interface";

export interface CandidateDocument extends Document, Candidate {}

const CandidateSchema = new Schema<CandidateDocument>({
  candidateName: { type: String, required: true },
  candidateImgUrl: { type: String, required: true },
  candidateContact: { type: String, required: true },
});

export const CandidateModel = mongoose.model<CandidateDocument>(
  "Candidate",
  CandidateSchema
);
