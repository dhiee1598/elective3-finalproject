import { RegisterUsers } from "../controllers/users.controller";
import { Router } from "express";
import { ValidateNewUser } from "../middlewares/request.validator";

const router = Router();

// * Description:    Create a new user
// * Route:          POST /api/users/auth/sign-up
// * Access:         Public
router.post("/auth/sign-up", ValidateNewUser, RegisterUsers);

export default router;
