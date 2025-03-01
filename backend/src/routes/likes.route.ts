import {
  CreateNewLikes,
  GetAllLikesBlog,
  UnlikeBlogs,
} from "../controllers/likes.controller";
import { Router } from "express";

const router = Router();

// * Description:    Get All Likes Blog
// * Route:          GET /api/likes/blogs/:blogId
// * Access:         Private
router.get("/blogs/:blogId", GetAllLikesBlog);

// * Description:    Create Likes
// * Route:          POST /api/likes
// * Access:         Private
router.post("/", CreateNewLikes);

// * Description:    Delete Likes
// * Route:          DELETE /api/likes/:likeId
// * Access:         Private
router.delete("/:likeId", UnlikeBlogs);

export default router;
