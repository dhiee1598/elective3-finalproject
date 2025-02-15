import { QueryClient, useMutation } from "@tanstack/react-query";
import api from "../utilities/axios";
import { NewUsersProps, AuthUsersProps } from "@/interfaces/users.props";

const queryClient = new QueryClient();

export const usePostUsers = (url: string) => {
  const createNewUser = useMutation({
    mutationFn: async (values: object) => {
      const response = await api.post(url, { ...values });
      return response.data.users as NewUsersProps;
    },
    onSettled: async (data, error) => {
      if (!error) {
        console.log(data);
        await queryClient.invalidateQueries({
          queryKey: ["users", data?.userId],
        });
      }
    },
  });

  return { createNewUser };
};

export const usePostAuthUsers = (url: string) => {
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
