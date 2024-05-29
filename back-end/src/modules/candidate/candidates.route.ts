// candidates/candidates.route.ts

import express, { Request, Response } from "express";
import { CandidateModel } from "./candidate.model";

const router = express.Router();

router.post("/add", async (req: Request, res: Response) => {
  try {
    const candidate = new CandidateModel(req.body);
    await candidate.save();
    res
      .status(201)
      .json({ message: "Candidate created successfully", candidate });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/get", async (req: Request, res: Response) => {
  try {
    const candidates = await CandidateModel.find();
    res.json(candidates);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a candidate
router.delete("/delete/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const candidate = await CandidateModel.findByIdAndDelete(id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    res.json({ message: "Candidate deleted successfully", candidate });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export const CandidateRoutes = router;
