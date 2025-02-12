import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { BlogsNewRequest, BlogsResponse } from "../interfaces/blogs.props";
import { FetchAllBlogsByUser, InsertBlogs } from "../services/blogs.service";

export const GetAllBlogsUsers: RequestHandler<
  unknown,
  BlogsResponse,
  unknown,
  unknown
> = asyncHandler(async (req, res) => {
  // Retrieve the user ID from the request (authenticated user)
  const id = req.userId;

  // Fetch all blogs that belong to the current user
  const blogs = await FetchAllBlogsByUser(id);

  // Return a successful response with the fetched blogs
  res.status(200).json({
    message: "Successfully retrieved all blogs for user",
    blogs: blogs,
  });
});

export const CreateNewBlogs: RequestHandler<
  unknown,
  BlogsResponse,
  BlogsNewRequest,
  unknown
> = asyncHandler(async (req, res) => {
  // Retrieve the user ID from the request (authenticated user)
  const id = req.userId;

  // Insert the new blog into the database with the provided blog data and user ID
  const newBlogs = await InsertBlogs(req.body, id);

  res.status(201).json({
    message: "Blog post created successfully",
    blogs: newBlogs,
  });
});
