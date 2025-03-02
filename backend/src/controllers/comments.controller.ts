import asyncHandler from "express-async-handler";
import {
  CommentsNewRequest,
  CommentsResponse,
} from "../interfaces/comments.props";
import { InsertComments } from "../services/comments.service";
import { RequestHandler } from "express";

export const CreateNewComments: RequestHandler<
  unknown,
  CommentsResponse,
  CommentsNewRequest,
  unknown
> = asyncHandler(async (req, res) => {
  // * Retrieve the user ID from the request (authenticated user)
  const id = req.userId;

  // * Insert the new comments into the database with the provided blog data and user ID
  const newComment = await InsertComments(req.body, id);

  res.status(201).json({
    message: "Comments blog created successfully",
    comments: newComment,
  });
});
