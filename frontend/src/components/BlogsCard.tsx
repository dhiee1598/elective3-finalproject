"use client";

import { useDeleteBlogs, useDeleteLikes } from "@/hooks/useDelete";
import { usePostLikes } from "@/hooks/usePost";
import { BlogsProps } from "@/interfaces/blogs.props";
import { UsersProps } from "@/interfaces/users.props";
import { FormatDate } from "@/utilities/formatDate";
import { toast } from "react-toastify";
import Image from "next/image";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CommentsBox from "./CommentsBox";

const BlogsCard = ({
  blog,
  activeUser,
}: {
  blog: BlogsProps;
  activeUser: UsersProps | null;
}) => {
  const hasLiked = blog.Likes.some(
    (like) => like.userId === activeUser?.userId,
  );
  const userLike = blog.Likes.find(
    (like) => like.userId === activeUser?.userId,
  );
  const hasPermission = blog.userId === activeUser?.userId ? true : false;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userLikeId, setUserLikeId] = useState<string>(userLike?.likeId ?? "");
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);

  const [isLiked, setIsLiked] = useState(hasLiked);
  const { createNewLikes } = usePostLikes("/api/likes");
  const { deleteLikeBlogs } = useDeleteLikes("/api/likes", userLikeId);
  const { deleteBlogs } = useDeleteBlogs("/api/blogs", blog.blogId);

  // Handle Delete Blog Click
  const handleDeleteBlog = async () => {
    try {
      await deleteBlogs.mutateAsync();
      toast.success("Blog has been deleted successfully.");
    } catch (error) {
      console.log("Error handling like/unlike:", error);
      setIsLiked(hasLiked);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        if (!userLikeId) {
          console.warn("Cannot unlike: likeId is missing");
          return;
        }

        setIsLiked(false);
        await deleteLikeBlogs.mutateAsync();
        setUserLikeId("");
        toast.success("You unliked the blog.");
      } else {
        const response = await createNewLikes.mutateAsync({
          blogId: blog.blogId,
          userId: activeUser?.userId,
        });

        setUserLikeId(response.likeId || "");
        setIsLiked(true);
        toast.success("You liked the blog!");
      }
    } catch (error) {
      console.log("Error handling like/unlike:", error);
      setIsLiked(hasLiked);
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="w-full max-w-lg bg-black bg-opacity-60 rounded-lg shadow-lg overflow-hidden border border-gray-200 p-4 sm:p-6 relative">
      <div className="flex items-center space-x-4">
        <Image
          src={blog.User.image_path}
          alt="Profile"
          className="w-12 h-12 object-cover rounded-full sm:w-16 sm:h-16"
          width={48}
          height={48}
        />
        <div>
          <p className="text-sm font-semibold text-gray-100">
            {blog.User.name}
          </p>
          <p className="text-xs text-gray-300">{FormatDate(blog.createdAt)}</p>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-100">
          {blog.title}
        </h2>
        <p className="text-sm text-gray-300 mt-2">{blog.blogType}</p>
        <p className="mt-4 text-gray-400 text-sm sm:text-base">
          {blog.content.slice(0, 150)}...
        </p>
        <div className="mt-4 flex flex-wrap text-sm justify-between items-center">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLikeClick}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              {isLiked ? "Unlike" : "Like"}
            </button>
            <span className="text-gray-300">{blog.Likes.length} Likes</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsCommentBoxOpen(true)}
              className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
            >
              Comment
            </button>
            <span className="text-gray-300">
              {blog.Comments.length} Comments
            </span>
          </div>
        </div>
        <div className="mt-4 flex justify-between text-sm">
          <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
            Read More
          </button>

          {hasPermission && (
            <>
              <div className="space-x-2">
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
                {/* <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"> */}
                {/*   Update */}
                {/* </button> */}
              </div>
              <Dialog
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
              >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to delete this blog? This action
                    cannot be undone.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setIsDeleteModalOpen(false)}
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeleteBlog}
                    color="error"
                    variant="contained"
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </div>
        {isCommentBoxOpen && (
          <CommentsBox
            comments={blog.Comments}
            blogId={blog.blogId}
            setIsCommentBoxOpen={setIsCommentBoxOpen}
          />
        )}
      </div>
    </div>
  );
};

export default BlogsCard;
