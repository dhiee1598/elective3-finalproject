import { RequestHandler } from "express";
import {
  LikesNewRequest,
  LikesParams,
  LikesResponse,
} from "../interfaces/likes.props";
import asyncHandler from "express-async-handler";
import {
  DeleteLikesBlog,
  FetchAllLikesBlog,
  FetchSingleLikes,
  InsertLikes,
} from "../services/likes.service";
import { BlogsParams } from "../interfaces/blogs.props";

export const GetAllLikesBlog: RequestHandler<
  BlogsParams,
  LikesResponse,
  unknown,
  unknown
> = asyncHandler(async (req, res) => {
  // * Fetch all blogs
  const likes = await FetchAllLikesBlog(req.params.blogId);

  // * Return a successful response with the fetched blogs
  res.status(200).json({
    message: "Successfully retrived all likes blogs",
    likes: likes,
  });
});

export const CreateNewLikes: RequestHandler<
  unknown,
  LikesResponse,
  LikesNewRequest,
  unknown
> = asyncHandler(async (req, res) => {
  // * Retrieve the user ID from the request (authenticated user)
  const id = req.userId;

  // * Insert the new likes into the database with the provided blog data and user ID
  const newLikes = await InsertLikes(req.body, id);

  res.status(201).json({
    message: "Likes blog created successfully",
    likes: newLikes,
  });
});

export const UnlikeBlogs: RequestHandler<
  LikesParams,
  unknown,
  unknown,
  unknown
> = asyncHandler(async (req, res) => {
  const likeId = req.params.likeId;

  // * Retrieve the user ID from the request (authenticated user)
  const id = req.userId;

  const singleLike = await FetchSingleLikes(likeId);
  // ! If the like does not exist, return a 404 error
  if (!singleLike) {
    res.status(404);
    throw new Error("Likes Not Found");
  }

  if (singleLike.userId !== id) {
    res.status(401);
    throw new Error("Unathorized Users");
  }

  await DeleteLikesBlog(likeId);

  res.status(200).json({
    message: "Deleted successfully",
  });
});
