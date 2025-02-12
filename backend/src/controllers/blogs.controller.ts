import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import {
  BlogsNewRequest,
  BlogsParams,
  BlogsResponse,
} from "../interfaces/blogs.props";
import {
  FetchAllBlogs,
  FetchSingleBlogsByID,
  InsertBlogs,
} from "../services/blogs.service";

export const GetAllBlogs: RequestHandler<
  unknown,
  BlogsResponse,
  unknown,
  unknown
> = asyncHandler(async (_req, res) => {
  // * Fetch all blogs
  const blogs = await FetchAllBlogs();

  // * Return a successful response with the fetched blogs
  res.status(200).json({
    message: "Successfully retrived all blogs",
    blogs: blogs,
  });
});

export const GetSingleBlogs: RequestHandler<
  BlogsParams,
  BlogsResponse,
  unknown,
  unknown
> = asyncHandler(async (req, res) => {
  // * Extracting blogId from request parameters
  const blogId = req.params.blogId;

  // * Fetching the blog data by ID
  const singleBlog = await FetchSingleBlogsByID(blogId);

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

export const CreateNewBlogs: RequestHandler<
  unknown,
  BlogsResponse,
  BlogsNewRequest,
  unknown
> = asyncHandler(async (req, res) => {
  // * Retrieve the user ID from the request (authenticated user)
  const id = req.userId;

  // * Insert the new blog into the database with the provided blog data and user ID
  const newBlogs = await InsertBlogs(req.body, id);

  res.status(201).json({
    message: "Blog post created successfully",
    blogs: newBlogs,
  });
});
