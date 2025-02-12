import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface BlogsProps
  extends Model<
    InferAttributes<BlogsProps>,
    InferCreationAttributes<BlogsProps>
  > {
  blogId: CreationOptional<string>;
  userId: string;
  title: string;
  content: string;
  blogType: string;
}

export interface BlogsNewRequest {
  title: string;
  content: string;
  blogType: string;
}

export interface BlogsResponse {
  message: string;
  blogs: BlogsProps | BlogsProps[];
}
