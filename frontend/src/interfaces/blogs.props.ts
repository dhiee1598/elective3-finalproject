interface UserBlogProps {
  name: string;
  email: string;
  image_path: string;
}

interface LikesBlogProps {
  likeId: string;
  userId: string;
  User: UserBlogProps;
}

export interface BlogsProps {
  blogId: string;
  title: string;
  content: string;
  blogType: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  User: UserBlogProps;
  Likes: LikesBlogProps[];
}
