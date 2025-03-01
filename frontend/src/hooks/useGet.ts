import { BlogsProps } from "@/interfaces/blogs.props";
import { LikesProps } from "@/interfaces/likes.props";
import { UsersProps } from "@/interfaces/users.props";
import api from "@/utilities/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetUsersBlog = (url: string) => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await api.get(url);
      return response.data.blogs as BlogsProps[];
    },
  });
};

export const useGetSingleUser = (url: string, userId: string) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: async () => {
      const response = await api.get(`${url}/${userId}`);
      return response.data.users as UsersProps;
    },
  });
};

export const useGetBlogLikes = (url: string, blogId: string) => {
  return useQuery({
    queryKey: ["likes", blogId],
    queryFn: async () => {
      const response = await api.get(`${url}/${blogId}`);
      return response.data.likes as LikesProps[];
    },
  });
};
