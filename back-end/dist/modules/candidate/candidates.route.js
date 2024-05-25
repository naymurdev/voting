"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateRoutes = void 0;
const express_1 = require("express");
const candidates_controller_1 = require("./candidates.controller");
const router = (0, express_1.Router)();
router.get("/info", candidates_controller_1.candidateAllInfo);
exports.CandidateRoutes = router;
