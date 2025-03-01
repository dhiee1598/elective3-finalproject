"use client";

import { usePostBlogs } from "@/hooks/usePost";
import { isAxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import CachedSharpIcon from "@mui/icons-material/CachedSharp";

const NewBlogs = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogType, setBlogType] = useState("Technology");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createNewBlogs.mutateAsync({ title, content, blogType });
      setContent("");
      setTitle("");
      setBlogType("Technology");
      toast.success("Blog created successfully!");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
        console.log(error);
      }
    }
  };

  const { createNewBlogs } = usePostBlogs("/api/blogs");

  return (
    <div className="w-full max-w-lg bg-black bg-opacity-60 rounded-lg p-8 flex flex-col items-center mb-4 border border-gray-200">
      <h2 className="text-3xl font-bold text-center mb-6 text-white">
        Create Your Blog
      </h2>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-transparent text-white placeholder-white border-b-2 border-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <textarea
            placeholder="Blog Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 bg-transparent text-white placeholder-white border-b-2 border-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={6}
          />
        </div>

        <div className="mb-6">
          <select
            value={blogType}
            onChange={(e) => setBlogType(e.target.value)}
            className="w-full p-3 bg-transparent text-white placeholder-white border-b-2 border-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={createNewBlogs.isPending}
          className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:bg-gradient-to-l mb-4"
        >
          {createNewBlogs.isPending ? (
            <CachedSharpIcon className="animate-spin" />
          ) : (
            "Publish Blog"
          )}
        </button>
      </form>
    </div>
  );
};

export default NewBlogs;
