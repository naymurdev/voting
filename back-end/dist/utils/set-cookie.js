"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookie = void 0;
const config_1 = require("../config");
function setCookie(res, token) {
    res.cookie("token", `Bearer ${token}`, {
        httpOnly: true,
        secure: !config_1.env.isDev,
    });
}
exports.setCookie = setCookie;
