"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteSchema = void 0;
const constants_1 = require("../../constants");
const zod_1 = require("zod");
exports.voteSchema = zod_1.z.object({
    country: zod_1.z.enum(constants_1.countries),
    votingStart: zod_1.z.string(),
});
