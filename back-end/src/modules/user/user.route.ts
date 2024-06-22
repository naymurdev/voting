import { validateRequest } from "../../middlewares/validate-request";
import { Router } from "express";
import {
  loginUser,
  matchConfirmationCode,
  registerUser,
} from "./user.controller";
import { loginSchema, registerSchema } from "./user.validation";
import { UserModel } from "./user.model";

const router = Router();

router.get("/get", async (req: any, res: any) => {
  try {
    const users = await UserModel.find({ "voted.vote": true });

    res.json({ message: "User updated successfully", users });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});
router.post("/register", validateRequest(registerSchema), registerUser);
router.post("/login", validateRequest(loginSchema), loginUser);
router.post("/match/confirmation-code", matchConfirmationCode);
router.put("/update/:id", async (req: any, res: any) => {
  const { id } = req.params;
  console.log(id);

  const updates = req.body;
  updates.vote = true;

  try {
    const user = await UserModel.findByIdAndUpdate(
      id,
      { voted: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export const UserRoutes = router;
