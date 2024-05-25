"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteSchema = void 0;
const zod_1 = require("zod");
exports.voteSchema = zod_1.z.object({
    partyName: zod_1.z.string(),
    userId: zod_1.z.string(),
});
