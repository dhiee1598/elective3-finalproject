import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utilities/axios";

export const useDeleteLikes = (url: string, likeId: string) => {
  const queryClient = useQueryClient();
  const deleteLikeBlogs = useMutation({
    mutationFn: async () => {
      const response = await api.delete(`${url}/${likeId}`);
      return response.data;
    },
    onSettled: async (_data, error) => {
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ["blogs"],
        });
      }
    },
  });

  return { deleteLikeBlogs };
};

export const useDeleteBlogs = (url: string, blogId: string) => {
  const queryClient = useQueryClient();
  const deleteBlogs = useMutation({
    mutationFn: async () => {
      const response = await api.delete(`${url}/${blogId}`);
      return response.data;
    },
    onSettled: async (_data, error) => {
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ["blogs"],
        });
      }
    },
  });

  return { deleteBlogs };
};
