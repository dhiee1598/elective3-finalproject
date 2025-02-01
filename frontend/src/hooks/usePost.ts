import { QueryClient, useMutation } from "@tanstack/react-query";
import api from "../utilities/axios";
import { NewUserProps } from "../interfaces/users.props";

const queryClient = new QueryClient();

export const usePostUsers = (url: string) => {
  const createNewUser = useMutation({
    mutationFn: async (values: object) => {
      const response = await api.post(url, { ...values });
      return response.data.users as NewUserProps;
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
