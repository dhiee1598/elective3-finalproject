import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface LikesProps
  extends Model<
    InferAttributes<LikesProps>,
    InferCreationAttributes<LikesProps>
  > {
  likeId: CreationOptional<string>;
  blogId: string;
  userId: string;
}

export interface LikesNewRequest {
  blogId: string;
}

export interface LikesResponse {
  message: string;
  likes: LikesProps | LikesProps[];
}

export interface LikesParams {
  likeId: string;
}
