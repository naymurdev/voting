"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const config_1 = require("../config");
const utils_1 = require("../utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.verifyToken = (0, utils_1.catchAsync)((req, res, next) => {
    try {
        const bearerHeader = req.headers.authorization || req.body.headers.Authorization;
        console.log(bearerHeader);
        if (!bearerHeader || !bearerHeader.startsWith("Bearer"))
            throw new Error();
        const token = bearerHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, config_1.env.JWT_SECRET, (err, decoded) => {
            if (err)
                throw err;
            req.jwtPayload = decoded;
            next();
        });
    }
    catch (err) {
        throw new utils_1.AppError(401, "Unauthorized access.");
    }
});
