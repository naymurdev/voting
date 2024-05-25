"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.duplicateError = exports.castError = exports.mongooseError = exports.zodError = exports.serverError = exports.appError = void 0;
const config_1 = require("../config");
function getStack(stack) {
    return config_1.env.isDevelopment ? stack : undefined;
}
function appError(error) {
    return {
        status: error.status,
        message: error.message,
        error: {
            sources: [],
            stack: getStack(error.stack),
        },
    };
}
exports.appError = appError;
function serverError(error) {
    return {
        status: 500,
        message: error.message,
        error: {
            sources: [],
            stack: getStack(error.stack),
        },
    };
}
exports.serverError = serverError;
function zodError(error) {
    const sources = error.issues.map((issue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    return {
        status: 403,
        message: "Zod validation error",
        error: {
            sources,
            stack: getStack(error.stack),
        },
    };
}
exports.zodError = zodError;
function mongooseError(error) {
    const sources = Object.values(error.errors).map((val) => {
        return {
            path: val.path,
            message: val.message,
        };
    });
    return {
        status: 403,
        message: "Mongoose validation error",
        error: {
            sources,
            stack: getStack(error.stack),
        },
    };
}
exports.mongooseError = mongooseError;
function castError(error) {
    const sources = [
        {
            path: error.path,
            message: error.message,
        },
    ];
    return {
        status: 400,
        message: "Invalid data type provided",
        error: {
            sources,
            stack: getStack(error.stack),
        },
    };
}
exports.castError = castError;
function duplicateError(error) {
    const { keyValue } = error;
    const sources = Object.keys(keyValue).map((path) => {
        return {
            path,
            message: `${keyValue[path]} already exists`,
        };
    });
    return {
        status: 409,
        message: "E11000 duplicate key error",
        error: {
            sources,
            stack: getStack(error.stack),
        },
    };
}
exports.duplicateError = duplicateError;
