"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNewBlogs = exports.GetSingleBlogs = exports.GetAllBlogs = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const blogs_service_1 = require("../services/blogs.service");
exports.GetAllBlogs = (0, express_async_handler_1.default)(async (_req, res) => {
    // * Fetch all blogs
    const blogs = await (0, blogs_service_1.FetchAllBlogs)();
    // * Return a successful response with the fetched blogs
    res.status(200).json({
        message: "Successfully retrived all blogs",
        blogs: blogs,
    });
});
exports.GetSingleBlogs = (0, express_async_handler_1.default)(async (req, res) => {
    // * Extracting blogId from request parameters
    const blogId = req.params.blogId;
    // * Fetching the blog data by ID
    const singleBlog = await (0, blogs_service_1.FetchSingleBlogsByID)(blogId);
    // ! If the blog does not exist, return a 404 error
    if (!singleBlog) {
        res.status(404);
        throw new Error("Blogs Not Found");
    }
    // * Send the response with the retrieved blog data
    res.status(200).json({
        message: "Successfully retrieved single blog",
        blogs: singleBlog,
    });
});
exports.CreateNewBlogs = (0, express_async_handler_1.default)(async (req, res) => {
    // * Retrieve the user ID from the request (authenticated user)
    const id = req.userId;
    // * Insert the new blog into the database with the provided blog data and user ID
    const newBlogs = await (0, blogs_service_1.InsertBlogs)(req.body, id);
    res.status(201).json({
        message: "Blog post created successfully",
        blogs: newBlogs,
    });
});
