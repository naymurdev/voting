"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotingRoutes = void 0;
const auth_1 = require("../../middlewares/auth");
const express_1 = require("express");
const vote_controller_1 = require("./vote.controller");
const router = (0, express_1.Router)();
router.post("/give", auth_1.verifyToken, vote_controller_1.giveVote);
exports.VotingRoutes = router;
