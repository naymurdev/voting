"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.add = void 0;
const config_1 = require("../../config");
const utils_1 = require("../../utils");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("./user.model");
function add(payload) {
    return user_model_1.UserModel.create(payload);
}
exports.add = add;
function login(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        let user;
        console.log(payload);
        if (payload) {
            user = yield user_model_1.UserModel.findOne({
                $or: [{ email: payload.userIdendity }, { userId: payload.userIdendity }],
            });
        }
        console.log(user);
        if (!user)
            throw new utils_1.AppError(404, "No user found!");
        const isMatched = yield (0, bcrypt_1.compare)(payload.password, user.password);
        if (!isMatched)
            throw new utils_1.AppError(401, "Password does not match.");
        const token = jsonwebtoken_1.default.sign({
            userID: user.userId,
            country: user.country,
            email: user.email,
            name: user.name,
        }, config_1.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        return {
            token,
            user,
        };
    });
}
exports.login = login;
