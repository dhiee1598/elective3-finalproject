import { CreateNewComments } from "../controllers/comments.controller";
import { Router } from "express";

const router = Router();

// * Description:    Create Comments
// * Route:          POST /api/comments
// * Access:         Private
router.post("/", CreateNewComments);

export default router;
