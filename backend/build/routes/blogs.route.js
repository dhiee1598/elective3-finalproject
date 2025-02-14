"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_validator_1 = require("../middlewares/request.validator");
const blogs_controller_1 = require("../controllers/blogs.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
// * Description:    Get all blogs
// * Route:          Get /api/blogs
// * Access:         Private
router.get("/", blogs_controller_1.GetAllBlogs);
// * Description:    Get single blogs
// * Route:          Get /api/blogs/:blogId
// * Access:         Private
router.get("/:blogId", blogs_controller_1.GetSingleBlogs);
// * Description:    Create a new blogs
// * Route:          POST /api/blogs
// * Access:         Private
router.post("/", request_validator_1.ValidateNewBlogs, blogs_controller_1.CreateNewBlogs);
exports.default = router;
