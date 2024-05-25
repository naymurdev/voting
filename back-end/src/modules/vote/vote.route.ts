import { verifyToken } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validate-request";
import { Router } from "express";
import { giveVote, upcomingVoteController } from "./vote.controller";
import { voteSchema } from "./vote.validation";

const router = Router();

router.post("/give", verifyToken, giveVote);

export const VotingRoutes = router;
