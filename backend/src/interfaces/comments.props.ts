import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface CommentProps
  extends Model<
    InferAttributes<CommentProps>,
    InferCreationAttributes<CommentProps>
  > {
  commentId: CreationOptional<string>;
  content: string;
  blogId: string;
  userId: string;
}

export interface CommentsNewRequest {
  blogId: string;
  content: string;
}

export interface CommentsResponse {
  message: string;
  comments: CommentProps | CommentProps[];
}

export interface CommentsParams {
  commentId: string;
}
