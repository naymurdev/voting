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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const bcrypt_1 = require("bcrypt");
const mongoose_1 = require("mongoose");
const constants_1 = require("../../constants");
const user_utils_1 = require("./user.utils");
const userModelSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value >= 18;
            },
            message: "You must be at least 18 years old to register.",
        },
    },
    country: { type: String, enum: constants_1.countries, required: true },
    password: { type: String, required: true },
    userId: { type: String, unique: true },
    voted: {
        vote: {
            type: Boolean,
            default: false,
        },
        partyName: String,
        candidateName: String,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, _a) => {
            var { password, createdAt, updatedAt, __v } = _a, rest = __rest(_a, ["password", "createdAt", "updatedAt", "__v"]);
            return rest;
        },
    },
});
userModelSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield (0, bcrypt_1.hash)(this.password, 10);
        this.userId = yield (0, user_utils_1.generateUserId)(this.country);
        next();
    });
});
exports.UserModel = (0, mongoose_1.model)("user", userModelSchema);
