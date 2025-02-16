import { BlogsProps } from "@/interfaces/blogs.props";
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
