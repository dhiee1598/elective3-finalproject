import { ValidateNewBlogs } from "../middlewares/request.validator";
import {
  CreateNewBlogs,
  GetAllBlogs,
  GetSingleBlogs,
  GetUsersBlogs,
  RemoveBlogs,
} from "../controllers/blogs.controller";
import { Router } from "express";

const router = Router();

// * Description:    Get all blogs
// * Route:          Get /api/blogs
// * Access:         Private
router.get("/", GetAllBlogs);

// * Description:    Get single blogs
// * Route:          Get /api/blogs/:blogId
// * Access:         Private
router.get("/:blogId", GetSingleBlogs);

// * Description:    Create a new blogs
// * Route:          POST /api/blogs
// * Access:         Private
router.post("/", ValidateNewBlogs, CreateNewBlogs);

// * Description:    Get All Users Blog
// * Route:          GET /api/blogs/users/:userId
// * Access:         Private
router.get("/users/:userId", GetUsersBlogs);

// * Description:    Delete Users Blog
// * Route:          DELETE /api/blogs/:blogId
// * Access:         Private
router.delete("/:blogId", RemoveBlogs);

export default router;
