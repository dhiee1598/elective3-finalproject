import { BlogsProps } from "@/interfaces/blogs.props";
import { UsersProps } from "@/interfaces/users.props";
import { FormatDate } from "@/utilities/formatDate";
import Image from "next/image";
import { useState } from "react";

const BlogsCard = ({ blog, user }: { blog: BlogsProps; user: UsersProps }) => {
  const [likes, setLikes] = useState(blog.likes || 0);
  const [comments, setComments] = useState(blog.comments || 0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="w-full max-w-lg bg-black bg-opacity-60 rounded-lg shadow-lg overflow-hidden border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center space-x-4">
        <Image
          src={user.image_path}
          alt="Profile"
          className="w-12 h-12 object-cover rounded-full sm:w-16 sm:h-16"
          width={48}
          height={48}
        />
        <div>
          <p className="text-sm font-semibold text-gray-100">{user.name}</p>
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
        <div className="mt-4 flex flex-wrap text-xs justify-between items-center">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLike}
              className="px-4 py-1 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Like
            </button>
            <span className="text-gray-300">{likes} Likes</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-1 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600">
              Comment
            </button>
            <span className="text-gray-300">{comments} Comments</span>
          </div>
        </div>
        <div className="mt-4 flex justify-start text-sm">
          <button className="px-4 py-1 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogsCard;
