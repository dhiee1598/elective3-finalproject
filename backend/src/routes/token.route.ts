import { Router } from "express";
import { RefreshAccessToken } from "../controllers/token.controller";

const router = Router();

// * Description:    Refresh access token
// * Route:          POST /api/auth/token/renew
// * Access:         Private
router.post("/renew", RefreshAccessToken);

export default router;
