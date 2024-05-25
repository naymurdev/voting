"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../../constants");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    age: zod_1.z.number(),
    password: zod_1.z.string(),
    country: zod_1.z.enum(constants_1.countries),
    voted: zod_1.z
        .object({
        vote: zod_1.z.boolean(),
        partyName: zod_1.z.string(),
        candidateName: zod_1.z.string(),
    })
        .optional(),
});
exports.loginSchema = zod_1.z.object({
    userIdendity: zod_1.z.string(),
    password: zod_1.z.string(),
});
