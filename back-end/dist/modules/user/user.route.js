"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const validate_request_1 = require("../../middlewares/validate-request");
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.post("/register", (0, validate_request_1.validateRequest)(user_validation_1.registerSchema), user_controller_1.registerUser);
router.post("/login", (0, validate_request_1.validateRequest)(user_validation_1.loginSchema), user_controller_1.loginUser);
exports.UserRoutes = router;
