import { Router } from "express";
import { UserRoutes } from "./modules/user/user.route";
import { VotingRoutes } from "./modules/vote/vote.route";

const router = Router();

router.use("/auth", UserRoutes);
router.use("/votes", VotingRoutes);

export default router;
