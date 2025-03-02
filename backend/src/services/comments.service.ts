import { CommentsNewRequest } from "../interfaces/comments.props";
import { Comments } from "../models";

// Function to insert a new comments
export const InsertComments = async (
  values: CommentsNewRequest,
  userId: string,
) => {
  try {
    return await Comments.create({ ...values, userId: userId });
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to insert data! Please try again.",
    );
  }
};
