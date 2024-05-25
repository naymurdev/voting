"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateSchema = void 0;
const constants_1 = require("../../constants");
const zod_1 = require("zod");
const candidateArray = zod_1.z.object({
    name: zod_1.z.string(),
    partyName: zod_1.z.string(),
    profileUrl: zod_1.z.string(),
});
exports.candidateSchema = zod_1.z.object({
    country: zod_1.z.enum(constants_1.countries),
    voteEndDate: zod_1.z.string(),
    candidate: zod_1.z.array(candidateArray),
    startDate: zod_1.z.string(),
});
