import { UsersProps } from "@/interfaces/users.props";
import api from "@/utilities/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePutUsers = (url: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: object) => {
      const response = await api.put(url, { ...values });
      return response.data.users as UsersProps;
    },
    onSettled: async (data, error) => {
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ["users", data?.userId],
        });
      }
    },
  });
};
