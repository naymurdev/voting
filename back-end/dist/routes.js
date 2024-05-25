"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("./modules/user/user.route");
const vote_route_1 = require("./modules/vote/vote.route");
const router = (0, express_1.Router)();
router.use("/auth", user_route_1.UserRoutes);
router.use("/votes", vote_route_1.VotingRoutes);
exports.default = router;
