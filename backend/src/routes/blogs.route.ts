import { ValidateNewBlogs } from "../middlewares/request.validator";
import {
  CreateNewBlogs,
  GetAllBlogsUsers,
} from "../controllers/blogs.controller";
import { Router } from "express";

const router = Router();

// * Description:    Get All Users Blogs
// * Route:          Get /api/blogs
// * Access:         Private
router.get("/", GetAllBlogsUsers);

// * Description:    Create a new blogs
// * Route:          POST /api/blogs
// * Access:         Private
router.post("/", ValidateNewBlogs, CreateNewBlogs);

export default router;
