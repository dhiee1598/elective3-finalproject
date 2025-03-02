interface UserCommentProps {
  name: string;
  email: string;
  image_path: string;
}
export interface CommentsProps {
  commentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  blogId: string;
  User: UserCommentProps;
}
