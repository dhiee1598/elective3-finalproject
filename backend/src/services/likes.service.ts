import { LikesNewRequest } from "../interfaces/likes.props";
import { Likes } from "../models";

// Function to insert a new likes
export const InsertLikes = async (values: LikesNewRequest, userId: string) => {
  try {
    return await Likes.create({ ...values, userId: userId });
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to insert data! Please try again.",
    );
  }
};

// Function to get all likes of blogs
export const FetchAllLikesBlog = async (blogId: string) => {
  try {
    return await Likes.findAll({ where: { blogId: blogId } });
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to fetch all Likes Blogs! Please try again.",
    );
  }
};

export const FetchSingleLikes = async (likeId: string) => {
  try {
    return await Likes.findOne({ where: { likeId: likeId } });
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to fetch all Likes Blogs! Please try again.",
    );
  }
};

export const DeleteLikesBlog = async (id: string) => {
  try {
    return await Likes.destroy({ where: { likeId: id } });
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to Delete Likes Blogs! Please try again.",
    );
  }
};
