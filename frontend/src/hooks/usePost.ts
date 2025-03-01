import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utilities/axios";
import { NewUsersProps, AuthUsersProps } from "@/interfaces/users.props";
import { BlogsProps } from "@/interfaces/blogs.props";
import { LikesProps } from "@/interfaces/likes.props";

export const usePostUsers = (url: string) => {
  const queryClient = useQueryClient();
  const createNewUser = useMutation({
    mutationFn: async (values: object) => {
      const response = await api.post(url, { ...values });
      return response.data.users as NewUsersProps;
    },
    onSettled: async (data, error) => {
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ["users", data?.userId],
        });
      }
    },
  });

  return { createNewUser };
};

export const usePostAuthUsers = (url: string) => {
  const queryClient = useQueryClient();
  const authUsers = useMutation({
    mutationFn: async (values: object) => {
      const response = await api.post(url, { ...values });
      return response.data as AuthUsersProps;
    },
    onSettled: async (data, error) => {
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ["users", data?.userId],
        });
      }
    },
  });

  return { authUsers };
};

export const usePostBlogs = (url: string) => {
  const queryClient = useQueryClient();
  const createNewBlogs = useMutation({
    mutationFn: async (values: object) => {
      const response = await api.post(url, { ...values });
      return response.data as BlogsProps;
    },
    onSettled: async (_data, error) => {
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ["blogs"],
        });
      }
    },
  });

  return { createNewBlogs };
};

export const usePostLikes = (url: string) => {
  const queryClient = useQueryClient();
  const createNewLikes = useMutation({
    mutationFn: async (values: object) => {
      const response = await api.post(url, { ...values });
      return response.data.likes as LikesProps;
    },
    onSettled: async (_data, error) => {
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ["blogs"],
        });
      }
    },
  });

  return { createNewLikes };
};
