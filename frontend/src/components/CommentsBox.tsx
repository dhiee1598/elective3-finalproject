import { CommentsProps } from "@/interfaces/comments.props";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { usePostComments } from "@/hooks/usePost";
import { motion } from "motion/react";
import Image from "next/image";
import { FormatDate } from "@/utilities/formatDate";
import { CachedSharp } from "@mui/icons-material";

const CommentsBox = ({
  comments,
  setIsCommentBoxOpen,
  blogId,
}: {
  comments: CommentsProps[];
  setIsCommentBoxOpen: (isOpen: boolean) => void;
  blogId: string;
}) => {
  const [newComment, setNewComment] = useState("");
  const { createNewComments } = usePostComments("/api/comments");

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    try {
      await createNewComments.mutateAsync({
        blogId: blogId,
        content: newComment,
      });

      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <div className="fixed inset-0 p-4 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full h-[calc(100vh-100px)] mt-20 overflow-auto  p-4 bg-gray-900 text-white rounded-lg">
        {/* Close Button */}
        <IconButton
          onClick={() => {
            document.body.style.overflow = "auto";
            setIsCommentBoxOpen(false);
          }}
          className="text-white float-right"
        >
          <CloseIcon className="text-white" />
        </IconButton>

        <h3 className="text-lg mt-2 font-semibold mb-3">Comments</h3>
        <div className="space-y-3">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <motion.div
                key={comment.commentId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-3 bg-gray-700 rounded-lg flex space-x-3"
              >
                <Image
                  src={comment.User.image_path}
                  alt="User Profile"
                  className="w-10 h-10 object-cover rounded-full"
                  width={40}
                  height={40}
                />
                <div>
                  <p className="font-semibold">{comment.User.name}</p>
                  <p className="text-xs text-gray-300">
                    {FormatDate(comment.createdAt)}
                  </p>
                  <p className="text-sm mt-2">{comment.content}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          <textarea
            className="w-full p-2 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={createNewComments.isPending}
            onClick={handleAddComment}
          >
            {createNewComments.isPending ? (
              <CachedSharp className="animate-spin" />
            ) : (
              "Post"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsBox;
