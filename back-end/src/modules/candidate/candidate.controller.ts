// candidate.controller.ts

import { Request, Response } from "express";
import { CandidateModel } from "./candidate.model";
import { CandidateSchema } from "./candidate.validation";

let candidates: CandidateModel[] = [];

export const createCandidate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const candidateData = CandidateSchema.parse(req.body);
    const candidate = CandidateModel.create(candidateData);
    candidates.push(candidate);
    res
      .status(201)
      .json({ message: "Candidate created successfully", candidate });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllCandidates = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.json(candidates);
};
