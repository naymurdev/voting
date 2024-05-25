"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalCatch = void 0;
const handle = __importStar(require("../helpers/handle-errors"));
const utils_1 = require("../utils");
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
let errorResponse = {
    success: false,
    status: 500,
    message: "Internal server error",
    error: {
        sources: [],
        stack: undefined,
    },
};
function globalCatch(error, req, res, next) {
    if (error instanceof zod_1.ZodError) {
        const zError = handle.zodError(error);
        errorResponse = Object.assign(Object.assign({}, errorResponse), zError);
    }
    else if (error instanceof mongoose_1.default.Error.ValidationError) {
        const mongooseError = handle.mongooseError(error);
        errorResponse = Object.assign(Object.assign({}, errorResponse), mongooseError);
    }
    else if (error instanceof mongoose_1.default.Error.CastError) {
        const castError = handle.castError(error);
        errorResponse = Object.assign(Object.assign({}, errorResponse), castError);
    }
    else if ("code" in error && error.code === 11000) {
        const e11000 = handle.duplicateError(error);
        errorResponse = Object.assign(Object.assign({}, errorResponse), e11000);
    }
    else if (error instanceof utils_1.AppError) {
        const appError = handle.appError(error);
        errorResponse = Object.assign(Object.assign({}, errorResponse), appError);
    }
    else if (error instanceof Error) {
        const serverError = handle.serverError(error);
        errorResponse = Object.assign(Object.assign({}, errorResponse), serverError);
    }
    const { status } = errorResponse, response = __rest(errorResponse, ["status"]);
    return res.status(status).json(response);
}
exports.globalCatch = globalCatch;
