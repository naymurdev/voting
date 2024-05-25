import { validateRequest } from "../../middlewares/validate-request";
import { Router } from "express";
import { loginUser, registerUser } from "./user.controller";
import { loginSchema, registerSchema } from "./user.validation";

const router = Router();

router.post("/register", validateRequest(registerSchema), registerUser);
router.post("/login", validateRequest(loginSchema), loginUser);

export const UserRoutes = router;
