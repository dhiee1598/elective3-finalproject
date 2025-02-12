import { Blogs, Users } from "../models";
import { BlogsNewRequest } from "../interfaces/blogs.props";

// Function to insert a new blogs
export const InsertBlogs = async (values: BlogsNewRequest, userId: string) => {
  try {
    return await Blogs.create({ ...values, userId: userId });
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to insert data! Please try again.",
    );
  }
};

// Function to get all blogs by userId
export const FetchAllBlogsByUser = async (id: string) => {
  try {
    return await Blogs.findAll({ where: { userId: id } });
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to fetch all Users Blogs! Please try again.",
    );
  }
};

// Function to get a blogs
export const FetchAllBlogs = async () => {
  try {
    return await Blogs.findAll({
      include: Users,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to fetch all Blogs! Please try again.",
    );
  }
};

// Function to get a single blogs
export const FetchSingleBlogsByID = async (blogId: string) => {
  try {
    return await Blogs.findByPk(blogId, { include: Users });
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to fetch all Blogs! Please try again.",
    );
  }
};
