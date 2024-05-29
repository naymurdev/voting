import { Router } from "express";
import { UserRoutes } from "./modules/user/user.route";
import { VotingRoutes } from "./modules/vote/vote.route";
import { CandidateRoutes } from "modules/candidate/candidates.route";

const router = Router();

router.use("/auth", UserRoutes);
router.use("/votes", VotingRoutes);
router.use("/candidate", CandidateRoutes);

export default router;
