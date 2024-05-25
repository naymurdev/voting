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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUserId = void 0;
const user_model_1 = require("./user.model");
function generateUserId(country) {
    return __awaiter(this, void 0, void 0, function* () {
        const previousUserId = yield getPreviousUserId(country);
        let incrementCode;
        if (previousUserId) {
            incrementCode = previousUserId.substring(3);
        }
        const prefix = getCountryPrefix(country);
        const newIncrementCode = (Number(incrementCode || 0) + 1)
            .toString()
            .padStart(3, "0");
        return `${prefix}-${newIncrementCode}`;
    });
}
exports.generateUserId = generateUserId;
function getPreviousUserId(country) {
    return __awaiter(this, void 0, void 0, function* () {
        const previousUser = yield user_model_1.UserModel.findOne({ country }, { userId: 1 })
            .sort({
            createdAt: -1,
        })
            .lean();
        return previousUser === null || previousUser === void 0 ? void 0 : previousUser.userId;
    });
}
function getCountryPrefix(country) {
    switch (country) {
        case "albania":
            return "AL";
        case "bosnia-and-hergezovina":
            return "BH";
        case "bulgaria":
            return "BU";
        case "croatia":
            return "CR";
        case "kosovo":
            return "KO";
        case "montenegro":
            return "MO";
        case "north-macedonia":
            return "NM";
    }
}
