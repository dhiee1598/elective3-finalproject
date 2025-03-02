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

interface CommentsBlogProps {
  commentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  blogId: string;
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
  Comments: CommentsBlogProps[];
}
